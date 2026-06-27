"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import HistoryCard from "@/components/history/HistoryCard";
import HistorySearch from "@/components/history/HistorySearch";
import EmptyHistory from "@/components/history/EmptyHistory";

type ResumeHistory = {
  id: number;
  filename: string;
  score: number;
  strengths: string;
  improvements: string;
  summary: string;
};

export default function ResumeHistoryPage() {

  const [history, setHistory] = useState<ResumeHistory[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchHistory();

  }, []);

  async function fetchHistory() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/resume-history"
      );

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
      item.filename
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [history, search]);

  return (<main className="min-h-screen bg-[#09090B] text-white">

  <div className="mx-auto max-w-7xl px-6 py-12">

    <Link
      href="/"
      className="text-zinc-500 transition hover:text-white"
    >
      ← Back to Home
    </Link>

    <div className="mt-10">

      <HistorySearch
        value={search}
        onChange={setSearch}
      />

      {loading ? (

        <div className="flex min-h-[400px] items-center justify-center">

          <p className="text-lg text-zinc-500">
            Loading history...
          </p>

        </div>

      ) : filteredHistory.length === 0 ? (

        <EmptyHistory />

      ) : (

        <div className="space-y-6">

          {filteredHistory.map((item) => (

            <HistoryCard
              key={item.id}
              filename={item.filename}
              score={item.score}
              date={`Resume #${item.id}`}
            />

          ))}

        </div>

      )}

    </div>

  </div>

</main>
  );
}