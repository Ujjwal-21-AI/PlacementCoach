import StatCard from "./StatCard";
import GoalsCard from "./GoalsCard";
import ActivityCard from "./ActivityCard";

const stats = [
  {
    title: "Resume Score",
    value: "92",
    change: "+8 this week",
  },
  {
    title: "ATS Match",
    value: "87%",
    change: "+5 improved",
  },
  {
    title: "Interview Ready",
    value: "81%",
    change: "Keep practicing",
  },
];

export default function DashboardPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      {/* Heading */}

      <div className="mx-auto max-w-3xl text-center">

        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          Product Preview
        </p>

        <h2 className="mt-4 text-5xl font-bold tracking-tight text-white">
          Everything at a glance.
        </h2>

        <p className="mt-5 text-lg leading-8 text-zinc-400">
          Monitor your placement progress from one intelligent dashboard.
        </p>

      </div>

      {/* Dashboard */}

      <div className="mx-auto mt-16 max-w-[980px] rounded-[28px] border border-white/5 bg-[#111113] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/5 pb-6">

          <div>

            <p className="text-sm text-zinc-500">
              Placement Dashboard
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-white">
              Welcome back 👋
            </h3>

          </div>

          <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
            Ready
          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-5 lg:grid-cols-3">

          {stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              change={item.change}
            />
          ))}

        </div>

        {/* Bottom */}

        <div className="mt-8 grid gap-5 lg:grid-cols-2">

          <GoalsCard />

          <ActivityCard />

        </div>

      </div>

    </section>
  );
}