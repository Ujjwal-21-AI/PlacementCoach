"use client";

import Link from "next/link";
import { useState } from "react";

import RoleSelector from "@/components/interview/RoleSelector";
import QuestionCard from "@/components/interview/QuestionCard";
import AnswerBox from "@/components/interview/AnswerBox";
import ScoreCard from "@/components/interview/ScoreCard";
import FeedbackCard from "@/components/interview/FeedbackCard";

type EvaluationResult = {
  score: number;
  strengths: string[];
  improvements: string[];
  better_answer: string;
};

export default function InterviewPage() {

  const [role, setRole] = useState("");

  const [questions, setQuestions] = useState<string[]>([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [loadingQuestions, setLoadingQuestions] =
    useState(false);

  const [loadingEvaluation, setLoadingEvaluation] =
    useState(false);

  const [result, setResult] =
    useState<EvaluationResult | null>(null);

  async function generateQuestions() {

    if (!role) {
      alert("Please select a role.");
      return;
    }

    try {

      setLoadingQuestions(true);
      setQuestions([]);
      setCurrentQuestion(0);
      setResult(null);
      setAnswer("");
      
      const response = await fetch(
        "http://127.0.0.1:8000/generate-questions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      const generatedQuestions = Array.isArray(data.questions)
      ? data.questions
      : [];
      
      setQuestions(generatedQuestions);

      setCurrentQuestion(0);

      setResult(null);

      setAnswer("");

    } catch (err) {

      console.error(err);

      alert("Failed to generate questions.");

    } finally {

      setLoadingQuestions(false);

    }

  }

  async function evaluateAnswer() {

    if (!answer.trim()) return;

    try {

      setLoadingEvaluation(true);

      const response = await fetch(
        "http://127.0.0.1:8000/evaluate-answer",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            role,
            question: questions[currentQuestion],
            answer,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      setResult(data);

    } catch (err) {

      console.error(err);

      alert("Evaluation failed.");

    } finally {

      setLoadingEvaluation(false);

    }

  }

  return (<main className="min-h-screen bg-[#09090B] text-white">

  <div className="mx-auto max-w-7xl px-6 py-12">

    <Link
      href="/"
      className="text-zinc-500 transition hover:text-white"
    >
      ← Back to Home
    </Link>

    <div className="mt-8">

      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
        AI Interview Coach
      </p>

      <div className="mt-4 flex items-center justify-between">

  <h1 className="text-5xl font-bold">
    Practice with AI.
  </h1>

  <Link
    href="/interview-history"
    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:border-cyan-400 hover:text-cyan-400"
  >
    View History →
  </Link>

</div>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
        Generate role-based interview questions, answer them,
        receive AI feedback and improve your interview skills.
      </p>

    </div>

    <div className="mt-14 grid gap-8 lg:grid-cols-[400px_1fr]">

      {/* LEFT */}

      <RoleSelector
        value={role}
        onChange={setRole}
        onGenerate={generateQuestions}
        loading={loadingQuestions}
      />

      {/* RIGHT */}

      <div className="space-y-8">

        {questions.length > 0 ? (

          <>

            <QuestionCard
              question={questions[currentQuestion]}
              current={currentQuestion + 1}
              total={questions.length}
            />

            <AnswerBox
              answer={answer}
              onChange={setAnswer}
              onEvaluate={evaluateAnswer}
              loading={loadingEvaluation}
            />

            {result && (

              <>

                <ScoreCard
                  score={result.score}
                />

                <FeedbackCard
                  strengths={result.strengths}
                  improvements={result.improvements}
                  betterAnswer={result.better_answer}
                />

                <div className="flex justify-end">

                  <button
                    onClick={() => {

  if (currentQuestion < questions.length - 1) {

    setCurrentQuestion(currentQuestion + 1);

    setAnswer("");

    setResult(null);

  } else {

    alert("Interview Completed 🎉");

    setQuestions([]);

    setCurrentQuestion(0);

    setAnswer("");

    setResult(null);

    setRole("");

  }

}}
                    className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
                  >
                    {currentQuestion ===
                    questions.length - 1
                      ? "Finish Interview"
                      : "Next Question →"}
                  </button>

                </div>

              </>

            )}

          </>

        ) : (

          <div className="flex min-h-[700px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#111113]">

            <div className="text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10">

                <span className="text-4xl">
                  🤖
                </span>

              </div>

              <h2 className="mt-8 text-3xl font-bold">
                Ready for Interview
              </h2>

              <p className="mx-auto mt-5 max-w-md leading-8 text-zinc-500">

                Select your target role and let AI
                generate interview questions
                personalized for you.

              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>

</main>  );
}