"use server";

import { headers } from "next/headers";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendEmail } from "@/lib/email/resend";
import type { Database } from "@/types/database.types";

type InquiryType = Database["public"]["Enums"]["inquiry_type"];

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  error?: string;
  // What the visitor typed, echoed back on error so the form isn't cleared.
  values?: Record<string, string>;
};

const ECHO_FIELDS = ["firstName", "lastName", "email", "phone", "serviceType", "message", "zipCode", "experience"];

const NOTIFY_EMAIL = "admin@imowit.com";
const INQUIRY_TYPES: InquiryType[] = ["residential", "commercial", "subcontractor", "partnership", "other"];
const TYPE_LABELS: Record<InquiryType, string> = {
  residential: "Residential",
  commercial: "Commercial",
  subcontractor: "Subcontractor",
  partnership: "Partnership",
  other: "Other",
};
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const CONTROL_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const SINGLE_LINE_CONTROL_RE = /[\u0000-\u001f\u007f]/;

function failed(formData: FormData, error: string): InquiryFormState {
  const values: Record<string, string> = {};
  for (const name of ECHO_FIELDS) values[name] = field(formData, name).slice(0, 5000);
  return { status: "error", error, values };
}

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

// Shared by the "Get In Touch" form (/inquire) and the subcontractor
// application (/subcontractors). Order: honeypot, Turnstile, validation, save
// (service role -> submit_inquiry), then email staff. The inquiry is saved
// even if the email fails, so nothing is lost; it's also in the admin inbox.
export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const sourcePage = field(formData, "sourcePage") === "subcontractors" ? "subcontractors" : "inquire";

  // Honeypot: a field hidden from people. Bots that fill it get a normal-looking
  // success, and nothing is saved or sent.
  if (field(formData, "website")) {
    return { status: "success" };
  }

  const requestHeaders = await headers();
  const remoteIp =
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;
  if (!(await verifyTurnstile(field(formData, "cf-turnstile-response"), remoteIp))) {
    return failed(formData, "Please complete the verification check and try again.");
  }

  const firstName = field(formData, "firstName");
  const lastName = field(formData, "lastName");
  const email = field(formData, "email");
  const phone = field(formData, "phone");
  const message = field(formData, "message");
  const zipCode = field(formData, "zipCode");
  const experience = field(formData, "experience");

  let inquiryType: InquiryType = "subcontractor";
  if (sourcePage === "inquire") {
    const requested = field(formData, "serviceType") as InquiryType;
    inquiryType = INQUIRY_TYPES.includes(requested) ? requested : "other";
  }

  if (!firstName || !lastName || !email) {
    return failed(formData, "Please enter your first name, last name and email.");
  }
  if (
    firstName.length > 100 || lastName.length > 100 ||
    SINGLE_LINE_CONTROL_RE.test(firstName + lastName + email + phone + zipCode)
  ) {
    return failed(formData, "Please check your name and contact details.");
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return failed(formData, "Please enter a valid email address.");
  }
  if (phone.length > 40) {
    return failed(formData, "Please enter a shorter phone number.");
  }
  if (zipCode && !/^\d{5}(-\d{4})?$/.test(zipCode)) {
    return failed(formData, "Please enter a 5-digit ZIP code.");
  }
  if (message.length > 5000 || experience.length > 2000 || CONTROL_RE.test(message + experience)) {
    return failed(formData, "Your message is too long. Please shorten it and try again.");
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return failed(formData, "Sorry, the form isn't working right now. Please try again later.");
  }

  const { data: inquiryId, error, status } = await supabase.rpc("submit_inquiry", {
    p_inquiry_type: inquiryType,
    p_first_name: firstName,
    p_last_name: lastName,
    p_email: email,
    p_source_page: sourcePage,
    p_phone: phone || undefined,
    p_message: message || undefined,
    p_zip_code: zipCode || undefined,
    p_experience: experience || undefined,
  });
  if (error) {
    if (error.hint === "rate_limited") {
      return failed(
        formData,
        "We've received several messages from this email address. Please try again later.",
      );
    }
    // Status, code and message identify the cause (e.g. 401 "Invalid API key"
    // from the API gateway has no code). None of them contain the key.
    console.error(
      `submit_inquiry failed status=${status} code=${error.code || "none"} message=${JSON.stringify(
        (error.message ?? "").slice(0, 200),
      )}`,
    );
    return failed(formData, "Sorry, something went wrong. Please try again.");
  }

  const lines = [
    `Type: ${TYPE_LABELS[inquiryType]}`,
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    zipCode && `Service ZIP code: ${zipCode}`,
    experience && `\nLawn care experience:\n${experience}`,
    message && `\nMessage:\n${message}`,
    `\nSubmitted from imowit.com/${sourcePage}. Reply to this email to answer ${firstName} directly.`,
    `Inquiry ID: ${inquiryId}`,
  ].filter(Boolean);

  const sent = await sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: `New ${TYPE_LABELS[inquiryType].toLowerCase()} inquiry: ${firstName} ${lastName}`,
    text: lines.join("\n"),
  });
  if (!sent) console.error("inquiry saved but notification email failed", inquiryId);

  return { status: "success" };
}
