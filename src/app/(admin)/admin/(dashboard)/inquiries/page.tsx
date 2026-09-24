import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Inquiries" };

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  subcontractor: "Subcontractor",
  partnership: "Partnership",
  other: "Other",
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Chicago",
});

// Read-only inbox of website inquiries (/inquire and /subcontractors), newest
// first. Reads with the admin's own session; RLS (inquiries_select) limits it
// to admins. Triage actions (mark read / archive) come with the fuller inbox.
export default async function InquiriesPage() {
  const { supabase } = await requireAdmin();

  const { data: inquiries, error } = await supabase
    .from("inquiries")
    .select("id, inquiry_type, first_name, last_name, email, phone, message, zip_code, experience, source_page, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Inquiries</h1>
      <p className="mt-1 text-sm text-[#333333]">
        Messages from the website&apos;s contact and subcontractor forms, newest first.
      </p>

      {error && <p role="alert" className="mt-6 text-sm text-red-700">Couldn&apos;t load inquiries.</p>}
      {!error && inquiries?.length === 0 && (
        <p className="mt-6 text-sm text-[#333333]">No inquiries yet.</p>
      )}

      <ul className="mt-6 space-y-4">
        {inquiries?.map((q) => (
          <li key={q.id} className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-semibold">
                {q.first_name} {q.last_name}
                <span className="ml-2 rounded bg-[#F5F5F5] px-2 py-0.5 text-xs font-medium">
                  {TYPE_LABELS[q.inquiry_type] ?? q.inquiry_type}
                </span>
                {q.status === "new" && (
                  <span className="ml-2 rounded bg-[#56C70B]/20 px-2 py-0.5 text-xs font-medium">New</span>
                )}
              </h2>
              <time className="text-xs text-[#333333]" dateTime={q.created_at}>
                {dateFormat.format(new Date(q.created_at))}
              </time>
            </div>
            <p className="mt-1 text-sm">
              <a href={`mailto:${q.email}`} className="underline">{q.email}</a>
              {q.phone && <> · {q.phone}</>}
              {q.zip_code && <> · ZIP {q.zip_code}</>}
              <span className="text-[#333333]"> · via /{q.source_page}</span>
            </p>
            {q.message && <p className="mt-3 whitespace-pre-wrap text-sm">{q.message}</p>}
            {q.experience && (
              <p className="mt-3 whitespace-pre-wrap text-sm">
                <span className="font-medium">Experience: </span>{q.experience}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
