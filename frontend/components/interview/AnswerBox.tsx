type AnswerBoxProps = {
  answer: string;
  loading: boolean;
  onChange: (value: string) => void;
  onEvaluate: () => void;
};

export default function AnswerBox({
  answer,
  loading,
  onChange,
  onEvaluate,
}: AnswerBoxProps) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
        Your Answer
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        Write your response
      </h2>

      <textarea
        value={answer}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
        className="mt-8 min-h-[260px] w-full resize-none rounded-2xl border border-white/10 bg-[#09090B] p-5 text-white outline-none transition focus:border-cyan-400"
      />

      <div className="mt-3 flex items-center justify-between text-sm text-zinc-500">

        <span>
          {answer.trim().length} characters
        </span>

        <span>
          Recommended: 150+ words
        </span>

      </div>

      <button
        onClick={onEvaluate}
        disabled={loading || answer.trim() === ""}
        className="mt-8 w-full rounded-2xl bg-cyan-400 py-4 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Evaluating..." : "Evaluate Answer"}
      </button>

    </div>
  );
}