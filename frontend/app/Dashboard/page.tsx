import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-cyan-300 hover:underline">
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Dashboard</h1>
        <p className="mt-3 text-slate-300">
          Your PlacementCoach performance summary will appear here.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Resume Score" value="82/100" />
          <Card title="Interview Readiness" value="74%" />
          <Card title="Roadmap Progress" value="58%" />
        </div>
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </div>
  );
}