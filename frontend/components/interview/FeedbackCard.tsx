type FeedbackCardProps = {
  strengths: string[];
  improvements: string[];
  betterAnswer: string;
};

export default function FeedbackCard({
  strengths,
  improvements,
  betterAnswer,
}: FeedbackCardProps) {
  return (
    <div className="space-y-8">

      {/* Strengths */}

      <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

        <p className="text-sm uppercase tracking-[0.2em] text-green-400">
          Strengths
        </p>

        <div className="mt-6 space-y-4">

          {strengths.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl bg-green-400/5 p-4"
            >
              <p className="text-zinc-300">
                {item}
              </p>
            </div>

          ))}

        </div>

      </div>

      {/* Improvements */}

      <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

        <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
          Improvements
        </p>

        <div className="mt-6 space-y-4">

          {improvements.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl bg-yellow-400/5 p-4"
            >
              <p className="text-zinc-300">
                {item}
              </p>
            </div>

          ))}

        </div>

      </div>

      {/* Better Answer */}

      <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
          AI Suggested Answer
        </p>

        <div className="mt-6 rounded-2xl bg-[#0D0D10] p-6">

          <p className="leading-8 text-zinc-300">
            {betterAnswer}
          </p>

        </div>

      </div>

    </div>
  );
}