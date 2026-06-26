"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">

        <div className="mx-auto max-w-4xl text-center">

          {/* Badge */}

          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">

            AI Powered Placement Platform

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-6xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">

            Crack Placements.

            <br />

            <span className="text-zinc-400">
              Smarter. Faster.
            </span>

          </h1>

          {/* Subtitle */}

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-zinc-400">

            Analyze resumes, practice AI mock interviews,
            improve ATS scores and track your complete placement
            journey — all in one platform.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/resume"
              className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,255,255,0.08)]"
            >

              Analyze Resume

              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

            </Link>

            <Link
              href="/interview"
              className="rounded-2xl border border-white/10 bg-[#151518] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-cyan-400/30 hover:bg-[#1A1A1E]"
            >

              Start Interview

            </Link>

          </div>

          {/* Stats */}

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">

            <Stat
              number="92%"
              title="Average Resume Score"
            />

            <Stat
              number="500+"
              title="Interview Questions"
            />

            <Stat
              number="24/7"
              title="AI Assistance"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

function Stat({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20">

      <h3 className="text-4xl font-bold text-white">
        {number}
      </h3>

      <p className="mt-3 text-zinc-400">
        {title}
      </p>

    </div>
  );
}