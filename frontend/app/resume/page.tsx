"use client";

import Link from "next/link";
import { useState } from "react";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setFileName(selected ? selected.name : "No file selected");
    setResult(null);
  };

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume file first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:8000/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Could not analyze the resume. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-cyan-300 hover:underline">
          ← Back to Home
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold">Resume Analyzer</h1>
          <p className="mt-3 text-slate-300">
            Upload your resume and get AI-powered feedback to improve it for placements.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Upload Resume</h2>
            <p className="mt-2 text-sm text-slate-400">
              PDF is best. The backend will extract the text and analyze it.
            </p>

            <label className="mt-6 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-slate-900/60 px-6 py-10 text-center transition hover:bg-slate-900">
              <div>
                <p className="text-lg font-medium">Click to upload</p>
                <p className="mt-2 text-sm text-slate-400">{fileName}</p>
              </div>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="mt-6 rounded-2xl bg-cyan-400/10 p-4 text-sm text-cyan-200">
              {loading
                ? "Analyzing resume..."
                : "Upload a resume, then click Analyze Resume."}
            </div>

            <div className="mt-6">
              <button
                onClick={analyzeResume}
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Analyze Resume
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold">Analysis Result</h2>

              {result ? (
                <div className="mt-6 space-y-5">
                  <div className="rounded-2xl bg-slate-900 p-5">
                    <p className="text-sm text-slate-400">Resume Score</p>
                    <p className="mt-2 text-4xl font-bold text-cyan-300">
                      {result.score}/100
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-900 p-5">
                      <p className="font-semibold text-emerald-300">Strengths</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-300">
                        {result.strengths.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-slate-900 p-5">
                      <p className="font-semibold text-amber-300">Improvements</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-300">
                        {result.improvements.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-900 p-5">
                    <p className="font-semibold">Summary</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {result.summary}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-slate-400">
                  Upload a resume to see the analysis here.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Resume Preview Text</h3>
              <p className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-slate-900 p-4 text-sm leading-7 text-slate-300">
              {result?.preview || "No resume text loaded yet."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}