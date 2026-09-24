"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryFormState } from "@/app/(marketing)/inquiry-actions";
import Turnstile from "./Turnstile";
import { FormError, FormSuccess, HoneypotField } from "./InquiryFormParts";

const initialState: InquiryFormState = { status: "idle" };
const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent";

export default function SubcontractorForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <FormSuccess
        title="Application received!"
        body="Thanks for your interest in joining the iMowiT network. We'll review your application and be in touch."
      />
    );
  }

  return (
    <form action={formAction} className="relative space-y-6">
      <input type="hidden" name="sourcePage" value="subcontractors" />
      <HoneypotField />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input type="text" id="firstName" name="firstName" required maxLength={100}
            defaultValue={v.firstName} className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input type="text" id="lastName" name="lastName" required maxLength={100}
            defaultValue={v.lastName} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input type="email" id="email" name="email" required maxLength={254}
          defaultValue={v.email} className={inputClass} />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone
        </label>
        <input type="tel" id="phone" name="phone" maxLength={40}
          defaultValue={v.phone} className={inputClass} />
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
          Service Zip Code
        </label>
        <input type="text" id="zipCode" name="zipCode" inputMode="numeric" maxLength={10}
          pattern="\d{5}(-\d{4})?" defaultValue={v.zipCode} className={inputClass} />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          Lawn Care Experience
        </label>
        <textarea id="experience" name="experience" rows={3} maxLength={2000}
          defaultValue={v.experience} className={inputClass}
          placeholder="Tell us about your experience..." />
      </div>

      <Turnstile resetSignal={state} />
      <FormError message={state.error} />

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#56C70B] text-[#001F51] px-8 py-3 rounded-lg font-semibold hover:bg-[#4ab309] disabled:opacity-60 transition-colors"
      >
        {pending ? "Sending…" : "Submit Application"}
      </button>
    </form>
  );
}
