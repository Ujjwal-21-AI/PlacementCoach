type Props = {
  filename: string;
  atsScore: number;
  matchedSkills: string;
  missingSkills: string;
  strengths: string;
  suggestions: string;
};

export default function ATSHistoryCard({
  filename,
  atsScore,
  matchedSkills,
  missingSkills,
  strengths,
  suggestions,
}: Props) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-cyan-400 text-sm uppercase tracking-[0.2em]">
            ATS Analysis
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {filename}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-zinc-500 text-sm">ATS Score</p>
          <p className="text-5xl font-bold text-cyan-400">
            {atsScore}
          </p>
        </div>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div>
          <h3 className="font-semibold text-green-400">
            Matched Skills
          </h3>

          <p className="mt-2 text-zinc-300 leading-7">
            {matchedSkills}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-red-400">
            Missing Skills
          </h3>

          <p className="mt-2 text-zinc-300 leading-7">
            {missingSkills}
          </p>
        </div>

      </div>

      <div className="mt-8">

        <h3 className="font-semibold text-green-400">
          Strengths
        </h3>

        <p className="mt-2 text-zinc-300 leading-7">
          {strengths}
        </p>

      </div>

      <div className="mt-8">

        <h3 className="font-semibold text-yellow-400">
          Suggestions
        </h3>

        <p className="mt-2 text-zinc-300 leading-7">
          {suggestions}
        </p>

      </div>

    </div>
  );
}