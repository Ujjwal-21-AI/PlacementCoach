"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardData = {
  total_resumes: number;
  latest_resume_score: number;
  average_resume_score: number;

  total_interviews: number;
  latest_interview_score: number;
  average_interview_score: number;
  highest_interview_score: number;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    total_resumes: 0,
    latest_resume_score: 0,
    average_resume_score: 0,

    total_interviews: 0,
    latest_interview_score: 0,
    average_interview_score: 0,
    highest_interview_score: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("http://127.0.0.1:8000/dashboard");
        const result = await res.json();

        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="text-cyan-300 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-3 text-slate-300">
          Your AI PlacementCoach Analytics
        </p>

        {loading ? (
          <p className="mt-10 text-slate-400">
            Loading Dashboard...
          </p>
        ) : (
          <>
            <h2 className="mt-10 mb-5 text-2xl font-bold">
              Resume Analytics
            </h2>

            <div className="grid gap-5 md:grid-cols-3">

              <Card
                title="Total Resumes"
                value={String(data.total_resumes)}
              />

              <Card
                title="Latest Resume Score"
                value={`${data.latest_resume_score}/100`}
              />

              <Card
                title="Average Resume Score"
                value={`${data.average_resume_score}/100`}
              />

            </div>

            <h2 className="mt-12 mb-5 text-2xl font-bold">
              Interview Analytics
            </h2>

            <div className="grid gap-5 md:grid-cols-4">

              <Card
                title="Total Interviews"
                value={String(data.total_interviews)}
              />

              <Card
                title="Latest Score"
                value={`${data.latest_interview_score}/100`}
              />

              <Card
                title="Average Score"
                value={`${data.average_interview_score}/100`}
              />

              <Card
                title="Highest Score"
                value={`${data.highest_interview_score}/100`}
              />

            </div>
          </>
        )}

      </div>
    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400 transition">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-cyan-300">
        {value}
      </h2>

    </div>
  );
}