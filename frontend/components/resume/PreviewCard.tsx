type PreviewCardProps = {
  preview: string;
};

export default function PreviewCard({
  preview,
}: PreviewCardProps) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <h2 className="text-2xl font-bold text-white">
        Resume Preview
      </h2>

      <p className="mt-3 text-zinc-500">
        Extracted text from your uploaded resume.
      </p>

      <div className="mt-8 max-h-[500px] overflow-y-auto rounded-2xl border border-white/5 bg-[#0D0D10] p-6">

        <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-300">
          {preview || "Upload a resume to preview its content."}
        </pre>

      </div>

    </div>
  );
}