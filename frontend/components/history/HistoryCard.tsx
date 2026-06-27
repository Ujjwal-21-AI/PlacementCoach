type HistoryCardProps = {
  filename: string;
  score: number;
  date: string;
};

export default function HistoryCard({
  filename,
  score,
  date,
}: HistoryCardProps) {
  const scoreColor =
    score >= 85
      ? "text-emerald-400"
      : score >= 70
      ? "text-cyan-400"
      : "text-yellow-400";

  return (
    <div className="group rounded-[28px] border border-white/5 bg-[#111113] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h3 className="text-2xl font-semibold text-white">
            {filename}
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            {date}
          </p>

        </div>

        <div className="flex items-center gap-6">

          <div className="text-center">

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Score
            </p>

            <p className={`mt-2 text-3xl font-bold ${scoreColor}`}>
              {score}
            </p>

          </div>

          <button className="rounded-xl border border-white/10 px-5 py-2 text-sm transition hover:border-cyan-400/30 hover:bg-white/5">
            View
          </button>

          <button className="rounded-xl border border-white/10 px-5 py-2 text-sm transition hover:border-cyan-400/30 hover:bg-white/5">
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}