type ImprovementCardProps = {
  improvements: string[];
};

export default function ImprovementCard({
  improvements,
}: ImprovementCardProps) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-lg">
          ⚡
        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Improvements
          </h2>

          <p className="text-sm text-zinc-500">
            Areas to improve
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        {improvements.length > 0 ? (
          improvements.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-red-500/10 bg-red-500/5 p-4"
            >
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-red-400" />

              <p className="leading-7 text-zinc-300">
                {item}
              </p>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">
            No suggestions available yet.
          </p>
        )}

      </div>

    </div>
  );
}