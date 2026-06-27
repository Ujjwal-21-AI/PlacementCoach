import Link from "next/link";

export default function EmptyHistory() {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#111113]">

      <div className="max-w-md text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10">

          <span className="text-4xl">📂</span>

        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          No Resume History
        </h2>

        <p className="mt-5 leading-8 text-zinc-500">
          Analyze your first resume to build your history and
          track your improvement over time.
        </p>

        <Link
          href="/resume"
          className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:-translate-y-1"
        >
          Analyze Resume
        </Link>

      </div>

    </div>
  );
}