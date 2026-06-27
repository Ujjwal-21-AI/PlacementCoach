type QuestionCardProps = {
  question: string;
  current: number;
  total: number;
};

export default function QuestionCard({
  question,
  current,
  total,
}: QuestionCardProps) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <div className="flex items-center justify-between">

        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
          Question
        </p>

        <div className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400">
          {current} / {total}
        </div>

      </div>

      <h2 className="mt-8 text-3xl font-bold leading-tight text-white">
        {question}
      </h2>

      <div className="mt-10 h-[2px] w-full rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{
            width: `${(current / total) * 100}%`,
          }}
        />
      </div>

    </div>
  );
}