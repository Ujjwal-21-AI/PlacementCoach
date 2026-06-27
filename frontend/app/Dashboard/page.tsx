"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import StatCard from "@/components/dashboard/StatCard";
import GoalsCard from "@/components/dashboard/GoalsCard";
import ActivityCard from "@/components/dashboard/ActivityCard";

type DashboardData = {

  total_resumes: number;

  latest_resume_score: number;

  average_resume_score: number;

  total_interviews: number;

  latest_interview_score: number;

  average_interview_score: number;

  highest_interview_score: number;

  total_ats: number;

  latest_ats_score: number;

  average_ats_score: number;

};

export default function DashboardPage() {

  const [data, setData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/dashboard"
      );

      const json = await response.json();

      setData(json);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <main className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">

        Loading Dashboard...

      </main>

    );

  }

  if (!data) {

    return (

      <main className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">

        Failed to load dashboard.

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#09090B] text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <Link
          href="/"
          className="text-zinc-500 hover:text-white transition"
        >
          ← Back to Home
        </Link>

        <div className="mt-8">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Dashboard
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Placement Analytics
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-zinc-400">
            View your complete progress across Resume,
            Interview and ATS modules.
          </p>

        </div>        {/* Stats */}

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Resume Analyses"
            value={data.total_resumes}
            change={`Latest Score: ${data.latest_resume_score}`}
          />

          <StatCard
            title="Average Resume"
            value={`${data.average_resume_score}%`}
            change="Overall Performance"
          />

          <StatCard
            title="Interviews"
            value={data.total_interviews}
            change={`Highest Score: ${data.highest_interview_score}`}
          />

          <StatCard
            title="Average Interview"
            value={`${data.average_interview_score}%`}
            change="Overall Performance"
          />

          <StatCard
  title="ATS Analyses"
  value={data.total_ats}
  change={`Latest Score: ${data.latest_ats_score}`}
/>

<StatCard
  title="Average ATS"
  value={`${data.average_ats_score}%`}
  change="Overall Performance"
/>

        </div>

        {/* Bottom Section */}

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Quick Actions */}

          <div className="rounded-3xl border border-white/5 bg-[#111113] p-8">

            <h2 className="text-3xl font-bold">
              Quick Actions
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <Link
                href="/resume"
                className="rounded-2xl border border-white/10 bg-[#09090B] p-6 transition hover:border-cyan-400"
              >
                <h3 className="text-xl font-semibold">
                  Resume Analyzer
                </h3>

                <p className="mt-3 text-zinc-500">
                  Analyze your resume using AI.
                </p>
              </Link>

              <Link
                href="/interview"
                className="rounded-2xl border border-white/10 bg-[#09090B] p-6 transition hover:border-cyan-400"
              >
                <h3 className="text-xl font-semibold">
                  AI Interview
                </h3>

                <p className="mt-3 text-zinc-500">
                  Practice technical interviews.
                </p>
              </Link>

              <Link
                href="/ats"
                className="rounded-2xl border border-white/10 bg-[#09090B] p-6 transition hover:border-cyan-400"
              >
                <h3 className="text-xl font-semibold">
                  ATS Match
                </h3>

                <p className="mt-3 text-zinc-500">
                  Compare resume with Job Description.
                </p>
              </Link>

              <Link
                href="/roadmap"
                className="rounded-2xl border border-white/10 bg-[#09090B] p-6 transition hover:border-cyan-400"
              >
                <h3 className="text-xl font-semibold">
                  Learning Roadmap
                </h3>

                <p className="mt-3 text-zinc-500">
                  Build your placement roadmap.
                </p>
              </Link>

            </div>

          </div>          {/* Right Side */}

          <div className="space-y-8">

            <GoalsCard />

            <ActivityCard />

          </div>

        </div>

      </div>

    </main>

  );

}