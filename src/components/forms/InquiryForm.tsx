"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryFormState } from "@/app/(marketing)/inquiry-actions";
import Turnstile from "./Turnstile";
import { FormError, FormSuccess, HoneypotField } from "./InquiryFormParts";

const initialState: InquiryFormState = { status: "idle" };
const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent";

export default function InquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <FormSuccess
        title="Thanks for reaching out!"
        body="We've received your message and will get back to you soon."
      />
    );
  }

  return (
    <form action={formAction} className="relative space-y-6">
      <input type="hidden" name="sourcePage" value="inquire" />
      <HoneypotField />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input type="text" id="firstName" name="firstName" required maxLength={100}
            defaultValue={v.firstName} className={inputClass} placeholder="John" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input type="text" id="lastName" name="lastName" required maxLength={100}
            defaultValue={v.lastName} className={inputClass} placeholder="Doe" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input type="email" id="email" name="email" required maxLength={254}
          defaultValue={v.email} className={inputClass} placeholder="john@example.com" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input type="tel" id="phone" name="phone" maxLength={40}
          defaultValue={v.phone} className={inputClass} placeholder="(555) 123-4567" />
      </div>

      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
          Service Interest
        </label>
        <select id="serviceType" name="serviceType" defaultValue={v.serviceType ?? ""} className={inputClass}>
          <option value="">Select a service</option>
          <option value="residential">Residential Service</option>
          <option value="commercial">Commercial Service</option>
          <option value="subcontractor">Subcontractor Opportunity</option>
          <option value="partnership">Partnership Inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea id="message" name="message" rows={5} maxLength={5000}
          defaultValue={v.message} className={inputClass}
          placeholder="Tell us about your lawn care needs..." />
      </div>

      <Turnstile resetSignal={state} />
      <FormError message={state.error} />

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#56C70B] text-[#001F51] px-8 py-3 rounded-lg font-semibold hover:bg-[#4ab309] disabled:opacity-60 transition-colors"
      >
        {pending ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}
