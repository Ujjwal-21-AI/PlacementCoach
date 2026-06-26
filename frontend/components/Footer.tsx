import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090B] px-6 py-20">

      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-4">

        {/* Brand */}

        <div>

          <div className="flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-cyan-400" />

            <h2 className="text-2xl font-bold text-white">
              PlacementCoach
            </h2>

          </div>

          <p className="mt-5 leading-8 text-zinc-400">
            Your all-in-one AI platform for resume analysis,
            ATS matching, mock interviews and placement preparation.
          </p>

        </div>

        {/* Product */}

        <div>

          <h3 className="text-lg font-semibold text-white">
            Product
          </h3>

          <div className="mt-6 space-y-4">

            <Link href="/resume" className="block text-zinc-400 hover:text-white">
              Resume Analyzer
            </Link>

            <Link href="/ats" className="block text-zinc-400 hover:text-white">
              ATS Match
            </Link>

            <Link href="/interview" className="block text-zinc-400 hover:text-white">
              Mock Interview
            </Link>

            <Link href="/roadmap" className="block text-zinc-400 hover:text-white">
              Roadmap
            </Link>

          </div>

        </div>

        {/* Resources */}

        <div>

          <h3 className="text-lg font-semibold text-white">
            Resources
          </h3>

          <div className="mt-6 space-y-4">

            <Link href="/history" className="block text-zinc-400 hover:text-white">
              Resume History
            </Link>

            <Link href="/interview-history" className="block text-zinc-400 hover:text-white">
              Interview History
            </Link>

            <Link href="/Dashboard" className="block text-zinc-400 hover:text-white">
              Dashboard
            </Link>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-lg font-semibold text-white">
            Built By
          </h3>

          <p className="mt-6 text-white">
            Ujjwal Kumar Sinha
          </p>

          <p className="mt-2 text-zinc-400">
            AI & Data Science Student
          </p>

          <div className="mt-8">

            <Link
              href="https://github.com/Ujjwal-21-AI"
              target="_blank"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white transition hover:border-cyan-400 hover:bg-white/5"
            >
              GitHub →
            </Link>

          </div>

        </div>

      </div>

      <div className="mx-auto mt-16 flex max-w-7xl items-center justify-between border-t border-white/5 pt-8">

        <p className="text-sm text-zinc-500">
          © 2026 PlacementCoach. All rights reserved.
        </p>

      </div>

    </footer>
  );
}