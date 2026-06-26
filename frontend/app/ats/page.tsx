"use client";

import Link from "next/link";
import { useState } from "react";

type ATSResult = {
  ats_score: number;
  matched_skills: string[];
  missing_skills: string[];
  strengths: string[];
  suggestions: string[];
};

export default function ATSPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file selected");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);

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

  const analyzeATS = async () => {
    if (!file) {
      alert("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste the Job Description.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "job_description",
        jobDescription
      );

      const response = await fetch(
        "http://127.0.0.1:8000/ats-match",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze ATS.");
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
    return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="text-cyan-300 hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold">
            ATS Resume Matcher
          </h1>

          <p className="mt-3 text-slate-300">
            Upload your resume and compare it with a Job Description using AI.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left Panel */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-2xl font-semibold">
              Upload Resume
            </h2>

            <label className="mt-6 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-slate-900 px-6 py-10">

              <div className="text-center">

                <p className="text-lg font-medium">
                  Click to Upload
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {fileName}
                </p>

              </div>

              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>

            <div className="mt-6">

              <p className="mb-2 text-sm font-medium">
                Job Description
              </p>

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                placeholder="Paste Job Description here..."
                className="min-h-48 w-full rounded-2xl bg-slate-900 p-4 outline-none"
              />

            </div>

            <button
              onClick={analyzeATS}
              className="mt-6 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              {loading
                ? "Analyzing..."
                : "Analyze ATS"}
            </button>

          </div>

          {/* Right Panel */}

          <div className="space-y-6">

            {!result ? (

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                <h2 className="text-2xl font-semibold">
                  ATS Report
                </h2>

                <p className="mt-4 text-slate-400">
                  Upload your resume and click Analyze ATS.
                </p>

              </div>

            ) : (

              <>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                  <h2 className="text-2xl font-semibold">
                    ATS Score
                  </h2>

                  <p className="mt-4 text-5xl font-bold text-cyan-300">
                    {result.ats_score}/100
                  </p>

                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  <div className="rounded-2xl bg-slate-900 p-5">

                    <p className="font-semibold text-green-400">
                      Matched Skills
                    </p>

                    <ul className="mt-3 space-y-2">

                      {result.matched_skills.map((skill) => (
                        <li key={skill}>
                          ✓ {skill}
                        </li>
                      ))}

                    </ul>

                  </div>

                  <div className="rounded-2xl bg-slate-900 p-5">

                    <p className="font-semibold text-red-400">
                      Missing Skills
                    </p>

                    <ul className="mt-3 space-y-2">

                      {result.missing_skills.map((skill) => (
                        <li key={skill}>
                          ✗ {skill}
                        </li>
                      ))}

                    </ul>

                  </div>

                </div>

                <div className="rounded-2xl bg-slate-900 p-5">

                  <p className="font-semibold text-green-400">
                    Strengths
                  </p>

                  <ul className="mt-3 space-y-2">

                    {result.strengths.map((item) => (
                      <li key={item}>
                        • {item}
                      </li>
                    ))}

                  </ul>

                </div>

                <div className="rounded-2xl bg-slate-900 p-5">

                  <p className="font-semibold text-yellow-400">
                    Suggestions
                  </p>

                  <ul className="mt-3 space-y-2">

                    {result.suggestions.map((item) => (
                      <li key={item}>
                        • {item}
                      </li>
                    ))}

                  </ul>

                </div>

              </>

            )}

          </div>

        </div>

      </div>
    </main>
  );
}