type HistorySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function HistorySearch({
  value,
  onChange,
}: HistorySearchProps) {
  return (
    <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
          Resume History
        </p>

        <h1 className="mt-3 text-5xl font-bold text-white">
          Previous Analyses
        </h1>

        <p className="mt-4 text-lg text-zinc-400">
          Browse all your analyzed resumes in one place.
        </p>

      </div>

      <input
        type="text"
        placeholder="Search resume..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-[#111113] px-6 py-4 text-white outline-none transition focus:border-cyan-400 lg:w-96"
      />

    </div>
  );
}