"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type HistoryItem = {
  id: number;
  filename: string;
  score: number;
  strengths: string;
  improvements: string;
  summary: string;
};

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/resume-history"
        );

        const data = await response.json();

        console.log("History Data:", data);

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
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-cyan-300 hover:underline">
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Resume Analysis History
        </h1>

        {loading && (
          <p className="mt-8 text-slate-400">
            Loading...
          </p>
        )}

        {!loading && items.length === 0 && (
          <p className="mt-8 text-slate-400">
            No resume analyses found.
          </p>
        )}

        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {item.filename}
                </h2>

                <span className="rounded-full bg-cyan-500/20 px-4 py-1 text-cyan-300">
                  {item.score}/100
                </span>
              </div>

              <p className="mt-4 text-slate-300">
                {item.summary}
              </p>

              <div className="mt-4">
                <p className="font-semibold text-green-400">
                  Strengths
                </p>
                <p className="text-slate-300">
                  {item.strengths}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-yellow-400">
                  Improvements
                </p>
                <p className="text-slate-300">
                  {item.improvements}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}