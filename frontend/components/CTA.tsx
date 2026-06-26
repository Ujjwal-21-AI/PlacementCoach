import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/5 bg-[#111113] p-14">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            Ready to begin?
          </p>

          <h2 className="mt-5 text-5xl font-bold leading-tight text-white md:text-6xl">
            Build your dream placement journey.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Resume analysis, ATS matching, AI mock interviews and a
            personalized roadmap — all inside one platform.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/resume"
              className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition duration-300 hover:scale-105"
            >
              Analyze Resume

              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/interview"
              className="rounded-2xl border border-white/10 bg-transparent px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:border-cyan-400/30 hover:bg-white/5"
            >
              Start Interview
            </Link>

          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-zinc-500">

            <span>✓ Free to use</span>

            <span>✓ AI Powered</span>

            <span>✓ Built for Students</span>

          </div>

        </div>

      </div>
    </section>
  );
}