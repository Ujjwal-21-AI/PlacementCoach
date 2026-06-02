"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const roles = ["SDE", "ML Engineer", "Data Analyst", "Web Developer"];

type QuestionResponse = {
  role: string;
  questions: string[];
};

type FeedbackResponse = {
  role: string;
  question: string;
  score: number;
  feedback: string;
};

export default function InterviewPage() {
  const [role, setRole] = useState("SDE");
  const [questions, setQuestions] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const currentQuestion = questions[questionIndex] || "Click generate to get questions.";

  const fetchQuestions = async (selectedRole: string) => {
    setLoadingQuestions(true);
    setFeedback(null);
    setAnswer("");

    try {
      const res = await fetch("http://127.0.0.1:8000/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data: QuestionResponse = await res.json();
      setQuestions(data.questions || []);
      setQuestionIndex(0);
    } catch (error) {
      console.error(error);
      alert("Could not load questions from backend.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions(role);
  }, [role]);

  const nextQuestion = () => {
    if (questions.length === 0) return;
    setQuestionIndex((prev) => (prev + 1) % questions.length);
    setAnswer("");
    setFeedback(null);
  };

  const getFeedback = async () => {
    if (!currentQuestion || !answer.trim()) {
      alert("Please type your answer first.");
      return;
    }

    setLoadingFeedback(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/evaluate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          question: currentQuestion,
          answer,
        }),
      });

      const data: FeedbackResponse = await res.json();
      setFeedback(data);
    } catch (error) {
      console.error(error);
      alert("Could not evaluate your answer.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-cyan-300 hover:underline">
          ← Back to Home
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold">Mock Interview</h1>
          <p className="mt-3 text-slate-300">
            Practice role-based interview questions and get instant feedback.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                role === r
                  ? "bg-cyan-400 text-slate-950"
                  : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Current role</p>
                <h2 className="mt-2 text-2xl font-semibold">{role}</h2>
              </div>

              <button
                onClick={() => fetchQuestions(role)}
                className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {loadingQuestions ? "Loading..." : "Generate Questions"}
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Question {questionIndex + 1}</p>
              <h3 className="mt-2 text-xl font-semibold leading-8">
                {currentQuestion}
              </h3>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-slate-300">Your answer</p>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-40 w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={getFeedback}
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {loadingFeedback ? "Checking..." : "Get Feedback"}
              </button>

              <button
                onClick={nextQuestion}
                className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Next Question
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold">Feedback</h2>
              {feedback ? (
                <div className="mt-4 rounded-2xl bg-slate-900 p-5">
                  <p className="text-sm text-cyan-300">Score: {feedback.score}/100</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {feedback.feedback}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-slate-400">
                  Write your answer and click “Get Feedback”.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Interview Tips</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <li>• Use clear structure: intro, explanation, example, conclusion</li>
                <li>• Keep answers confident and relevant</li>
                <li>• Add real project or internship examples</li>
                <li>• Avoid very short one-line answers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}