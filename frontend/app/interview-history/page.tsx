"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import InterviewCard from "@/components/interview-history/InterviewCard";
import SearchBar from "@/components/interview-history/SearchBar";

type InterviewHistory = {
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

  const [history, setHistory] = useState<InterviewHistory[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interview-history`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const data = await response.json();

      setHistory(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  const filteredHistory = useMemo(() => {

    return history.filter((item) =>
      item.role.toLowerCase().includes(search.toLowerCase())
    );

  }, [history, search]);

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
            Interview History
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Previous Interviews
          </h1>

          <p className="mt-5 text-lg text-zinc-400 max-w-2xl">
            Review your previous interview attempts,
            AI scores and suggested answers.
          </p>

        </div>

        <div className="mt-10">

          <SearchBar
            value={search}
            onChange={setSearch}
          />

        </div>

        <div className="mt-10">

          {loading ? (

            <div className="flex h-[400px] items-center justify-center">

              <p className="text-zinc-500">
                Loading...
              </p>

            </div>

          ) : filteredHistory.length === 0 ? (

            <div className="flex h-[400px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#111113]">

              <div className="text-center">

                <h2 className="text-3xl font-bold">
                  No Interview History
                </h2>

                <p className="mt-4 text-zinc-500">
                  Complete an interview to see
                  your history here.
                </p>

              </div>

            </div>

          ) : (

            <div className="space-y-8">

              {filteredHistory.map((item) => (

                <InterviewCard
                  key={item.id}
                  role={item.role}
                  score={item.score}
                  question={item.question}
                  answer={item.answer}
                  betterAnswer={item.better_answer}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </main>

  );

}