// Pieces shared by the website's inquiry and subcontractor forms.

// Bots tend to fill every field; people never see this one. The Server Action
// silently discards submissions that fill it.
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto w-px h-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-red-700">
      {message}
    </p>
  );
}

export function FormSuccess({ title, body }: { title: string; body: string }) {
  return (
    <div role="status" className="rounded-lg border border-[#56C70B] bg-[#56C70B]/10 px-6 py-8 text-center">
      <h3 className="text-xl font-semibold text-[#001F51]">{title}</h3>
      <p className="mt-2 text-gray-700">{body}</p>
    </div>
  );
}
