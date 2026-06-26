"use client";

import { ChangeEvent } from "react";

type UploadCardProps = {
  fileName: string;
  loading: boolean;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
};

export default function UploadCard({
  fileName,
  loading,
  onFileChange,
  onAnalyze,
}: UploadCardProps) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <h2 className="text-2xl font-bold text-white">
        Upload Resume
      </h2>

      <p className="mt-3 text-zinc-400">
        Upload your PDF resume and let AI analyze it.
      </p>

      <label className="mt-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0D0D10] px-8 py-16 transition-all duration-300 hover:border-cyan-400/30">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10">

            <span className="text-3xl">📄</span>

          </div>

          <p className="mt-6 text-lg font-semibold text-white">
            Drag & Drop Resume
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            or click to browse
          </p>

          <p className="mt-6 text-sm text-cyan-400">
            {fileName}
          </p>

        </div>

        <input
          type="file"
          accept=".pdf,.txt"
          className="hidden"
          onChange={onFileChange}
        />

      </label>

      <button
        onClick={onAnalyze}
        className="mt-8 w-full rounded-2xl bg-white py-4 text-lg font-semibold text-black transition-all duration-300 hover:-translate-y-1"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

    </div>
  );
}