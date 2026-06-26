type StrengthCardProps = {
  strengths: string[];
};

export default function StrengthCard({
  strengths,
}: StrengthCardProps) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-lg">
          ✅
        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Strengths
          </h2>

          <p className="text-sm text-zinc-500">
            Things you're doing well
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        {strengths.length > 0 ? (
          strengths.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4"
            >
              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />

              <p className="leading-7 text-zinc-300">
                {item}
              </p>
            </div>
          ))
        ) : (
          <p className="text-zinc-500">
            No strengths available yet.
          </p>
        )}

      </div>

    </div>
  );
}