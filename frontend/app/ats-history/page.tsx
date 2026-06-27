"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ATSHistoryCard from "@/components/ats-history/ATSHistoryCard";
import SearchBar from "@/components/ats-history/SearchBar";

type ATSHistory = {
  id: number;
  filename: string;
  ats_score: number;
  matched_skills: string;
  missing_skills: string;
  strengths: string;
  suggestions: string;
};

export default function ATSHistoryPage() {

  const [history, setHistory] = useState<ATSHistory[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/ats-history"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch ATS history");
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
      item.filename.toLowerCase().includes(search.toLowerCase())
    );

  }, [history, search]);

  return (

    <main className="min-h-screen bg-[#09090B] text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <Link
          href="/"
          className="text-zinc-500 transition hover:text-white"
        >
          ← Back to Home
        </Link>

        <div className="mt-8">

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            ATS History
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Previous ATS Reports
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Browse every ATS analysis you've performed and review
            your resume compatibility reports.
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
                  No ATS Reports
                </h2>

                <p className="mt-4 text-zinc-500">
                  Analyze a resume to see ATS history here.
                </p>

              </div>

            </div>

          ) : (

            <div className="space-y-8">

              {filteredHistory.map((item) => (

                <ATSHistoryCard
                  key={item.id}
                  filename={item.filename}
                  atsScore={item.ats_score}
                  matchedSkills={item.matched_skills}
                  missingSkills={item.missing_skills}
                  strengths={item.strengths}
                  suggestions={item.suggestions}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </main>

  );

}