"use client";

import Link from "next/link";
import { useState } from "react";

import UploadCard from "@/components/resume/UploadCard";
import ScoreCard from "@/components/resume/ScoreCard";
import StrengthCard from "@/components/resume/StrengthCard";
import ImprovementCard from "@/components/resume/ImprovementCard";
import PreviewCard from "@/components/resume/PreviewCard";
import InsightsCard from "@/components/resume/InsightsCard";

type ResumeResult = {
  filename: string;
  score: number;
  strengths: string[];
  improvements: string[];
  summary: string;
  preview: string;
};

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file selected");
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = e.target.files?.[0] || null;

    setFile(selected);
    setFileName(
      selected ? selected.name : "No file selected"
    );

    setResult(null);
  };

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/analyze-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze");
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend is not running.");
    } finally {
      setLoading(false);
    }
  };

  return (<main className="min-h-screen bg-[#09090B] text-white">

  <div className="mx-auto max-w-7xl px-6 py-12">

    {/* Header */}

    <Link
      href="/"
      className="text-zinc-500 transition hover:text-white"
    >
      ← Back to Home
    </Link>

    <div className="mt-8">

      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
        Resume Analyzer
      </p>

      <div className="mt-4 flex items-center justify-between">

  <h1 className="text-5xl font-bold tracking-tight">
    Improve your resume with AI.
  </h1>

  <Link
    href="/resume-history"
    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:border-cyan-400 hover:text-cyan-400"
  >
    View History →
  </Link>

</div>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
        Upload your resume and receive an ATS score,
        AI suggestions, strengths and improvement areas.
      </p>

    </div>

    {/* Main Grid */}

    <div className="mt-14 grid gap-8 lg:grid-cols-[420px_1fr]">

      {/* Left */}

      <UploadCard
        fileName={fileName}
        loading={loading}
        onFileChange={handleFileChange}
        onAnalyze={analyzeResume}
      />

      {/* Right */}

      <div className="space-y-8">

        {result ? (

          <>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

                <ScoreCard
                  score={result.score}
                  summary={result.summary}
                />

                <InsightsCard
                  score={result.score}
                />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">

              <StrengthCard
                strengths={result.strengths}
              />

              <ImprovementCard
                improvements={result.improvements}
              />

            </div>

            <PreviewCard
              preview={result.preview}
            />

          </>

        ) : (

          <div className="flex min-h-[650px] items-center justify-center rounded-[30px] border border-dashed border-white/10 bg-[#111113]">

            <div className="text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10">

                <span className="text-4xl">
                  📄
                </span>

              </div>

              <h2 className="mt-8 text-3xl font-bold">
                No Resume Analysis
              </h2>

              <p className="mx-auto mt-5 max-w-md leading-8 text-zinc-500">

                Upload your resume and click

                <span className="text-cyan-400">

                  {" "}Analyze Resume{" "}

                </span>

                to generate your AI report.

              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>

</main>
  );
}