"use client";

import Link from "next/link";
import { useState } from "react";

const roadmapItems = [
  {
    title: "Improve Resume Bullets",
    detail: "Add measurable impact to 3 project points.",
    status: "High Priority",
  },
  {
    title: "Practice DSA",
    detail: "Solve arrays, strings, and linked list questions.",
    status: "In Progress",
  },
  {
    title: "Mock HR Prep",
    detail: "Prepare answers for common placement questions.",
    status: "Pending",
  },
  {
    title: "Project Polish",
    detail: "Make PlacementCoach look like a real product.",
    status: "In Progress",
  },
];

export default function RoadmapPage() {
  const [goal, setGoal] = useState("SDE");

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-cyan-300 hover:underline">
          ← Back to Home
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold">Placement Roadmap</h1>
          <p className="mt-3 text-slate-300">
            Your personalized weekly prep plan for placements.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {["SDE", "ML Engineer", "Data Analyst", "Web Developer"].map((role) => (
            <button
              key={role}
              onClick={() => setGoal(role)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                goal === role
                  ? "bg-cyan-400 text-slate-950"
                  : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">This Week’s Plan</h2>

            <div className="mt-6 space-y-4">
              {roadmapItems.map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-900 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold">Current Target</h2>
              <p className="mt-3 text-4xl font-bold text-cyan-300">{goal}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Roadmap updated for your target role. Later this will become AI-generated
                based on resume gaps and interview performance.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Daily Focus</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <li>• 30 minutes DSA practice</li>
                <li>• 20 minutes resume improvement</li>
                <li>• 1 mock interview answer</li>
                <li>• 1 project improvement task</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}