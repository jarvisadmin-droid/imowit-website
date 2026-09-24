export default function AdminNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-[#333333]">
        This admin page doesn&apos;t exist. <a href="/" className="underline">Go to the dashboard</a>.
      </p>
    </div>
  );
}
