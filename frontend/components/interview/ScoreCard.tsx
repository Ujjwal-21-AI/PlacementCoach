type ScoreCardProps = {
  score: number;
};

export default function ScoreCard({
  score,
}: ScoreCardProps) {
  const color =
    score >= 80
      ? "text-green-400"
      : score >= 60
      ? "text-yellow-400"
      : "text-red-400";

  const bg =
    score >= 80
      ? "bg-green-400/10"
      : score >= 60
      ? "bg-yellow-400/10"
      : "bg-red-400/10";

  const status =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : "Needs Improvement";

  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
        Interview Score
      </p>

      <div className="mt-8 flex items-center justify-between">

        <div>

          <h2 className={`text-6xl font-bold ${color}`}>
            {score}
            <span className="text-3xl">/100</span>
          </h2>

          <p className="mt-4 text-zinc-500">
            AI evaluation based on your answer.
          </p>

        </div>

        <div
          className={`rounded-full px-5 py-3 text-sm font-semibold ${bg} ${color}`}
        >
          {status}
        </div>

      </div>

      <div className="mt-10 h-3 overflow-hidden rounded-full bg-white/5">

        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-700"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}