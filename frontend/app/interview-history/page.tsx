"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type InterviewItem = {
  id: number;
  role: string;
  question: string;
  answer: string;
  score: number;
  strengths: string;
  improvements: string;
  better_answer: string;
};

export default function InterviewHistoryPage() {
  const [items, setItems] = useState<InterviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/interview-history"
        );

        const data = await response.json();

        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="text-cyan-300 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Interview History
        </h1>

        {loading && (
          <p className="mt-6 text-slate-400">
            Loading...
          </p>
        )}

        {!loading && items.length === 0 && (
          <p className="mt-6 text-slate-400">
            No interview records found.
          </p>
        )}

        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {item.role}
                </h2>

                <span className="rounded-full bg-cyan-500/20 px-4 py-1 text-cyan-300">
                  {item.score}/100
                </span>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-cyan-400">
                  Question
                </p>

                <p className="mt-1 text-slate-300">
                  {item.question}
                </p>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-white">
                  Your Answer
                </p>

                <p className="mt-1 text-slate-300">
                  {item.answer}
                </p>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-green-400">
                  Strengths
                </p>

                <p className="mt-1 text-slate-300">
                  {item.strengths}
                </p>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-yellow-400">
                  Improvements
                </p>

                <p className="mt-1 text-slate-300">
                  {item.improvements}
                </p>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-purple-400">
                  Better Answer
                </p>

                <p className="mt-1 text-slate-300 whitespace-pre-line">
                  {item.better_answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}