export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to iMowiT
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your company web application is ready.
        </p>
        <div className="text-sm text-gray-400">
          Tech Stack: Next.js + React + TypeScript + Tailwind + Supabase + Stripe
        </div>
      </div>
    </main>
  );
}