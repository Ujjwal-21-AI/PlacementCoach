type ScoreCardProps = {
  score: number;
  summary: string;
};

export default function ScoreCard({
  score,
  summary,
}: ScoreCardProps) {
  const getColor = () => {
    if (score >= 85) return "text-emerald-400";
    if (score >= 70) return "text-cyan-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatus = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
  };

  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-wider text-zinc-500">
            Resume Score
          </p>

          <h2 className={`mt-3 text-6xl font-bold ${getColor()}`}>
            {score}
            <span className="text-3xl text-white">/100</span>
          </h2>

        </div>

        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
          {getStatus()}
        </div>

      </div>

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#1B1B20]">

        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-700"
          style={{ width: `${score}%` }}
        />

      </div>

      <p className="mt-8 leading-7 text-zinc-400">
        {summary}
      </p>

    </div>
  );
}