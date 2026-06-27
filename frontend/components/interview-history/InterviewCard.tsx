type Props = {
  role: string;
  score: number;
  question: string;
  answer: string;
  betterAnswer: string;
};

export default function InterviewCard({
  role,
  score,
  question,
  answer,
  betterAnswer,
}: Props) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-cyan-400 text-sm uppercase tracking-[0.2em]">
            {role}
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Score {score}/100
          </h2>

        </div>

        <div className="rounded-full bg-cyan-400/10 px-5 py-2 text-cyan-400">
          AI Feedback
        </div>

      </div>

      <div className="mt-8 space-y-6">

        <div>

          <p className="text-zinc-500 text-sm">
            Question
          </p>

          <p className="mt-2">
            {question}
          </p>

        </div>

        <div>

          <p className="text-zinc-500 text-sm">
            Your Answer
          </p>

          <p className="mt-2 text-zinc-300">
            {answer}
          </p>

        </div>

        <div>

          <p className="text-cyan-400 text-sm">
            Better Answer
          </p>

          <p className="mt-2 text-zinc-300 leading-8">
            {betterAnswer}
          </p>

        </div>

      </div>

    </div>
  );
}