type InsightsCardProps = {
  score: number;
};

export default function InsightsCard({
  score,
}: InsightsCardProps) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
        AI INSIGHTS
      </p>

      <h2 className="mt-4 text-3xl font-bold">
        Placement Readiness
      </h2>

      <div className="mt-8 space-y-6">

        <div className="flex items-center justify-between">

          <span className="text-zinc-400">
            Resume Quality
          </span>

          <span className="font-semibold text-white">
            {score}%
          </span>

        </div>

        <div className="h-2 rounded-full bg-[#1B1B20]">

          <div
            className="h-full rounded-full bg-cyan-400"
            style={{
              width: `${score}%`,
            }}
          />

        </div>

        <div className="grid gap-4">

          <Insight
            title="ATS Compatibility"
            value="Excellent"
            color="text-emerald-400"
          />

          <Insight
            title="Keyword Coverage"
            value="Good"
            color="text-cyan-400"
          />

          <Insight
            title="Project Quality"
            value="Strong"
            color="text-cyan-400"
          />

          <Insight
            title="Impact Statements"
            value="Needs Work"
            color="text-yellow-400"
          />

        </div>

      </div>

    </div>
  );
}

function Insight({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#0D0D10] p-4">

      <span className="text-zinc-400">
        {title}
      </span>

      <span className={`font-semibold ${color}`}>
        {value}
      </span>

    </div>
  );
}