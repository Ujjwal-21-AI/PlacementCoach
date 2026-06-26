export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload Resume",
      description:
        "Upload your resume and receive detailed AI-powered feedback with ATS optimization.",
    },
    {
      number: "02",
      title: "Practice & Improve",
      description:
        "Take mock interviews, improve weak areas, and get personalized suggestions.",
    },
    {
      number: "03",
      title: "Get Placement Ready",
      description:
        "Track your progress, follow your roadmap, and apply with confidence.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          How it works
        </p>

        <h2 className="mt-4 text-5xl font-bold text-white">
          Three simple steps.
        </h2>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          Placement preparation shouldn't be confusing. Our platform guides
          you through every stage.
        </p>
      </div>

      <div className="relative mt-20">

      {/* Connector Line */}

     <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent lg:block" />

  <div className="grid gap-8 lg:grid-cols-3">        {steps.map((step) => (
          <div
            key={step.number}
            className="
                relative
                rounded-[28px]
                border
                border-white/5
                bg-[#101012]
                p-8
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/20
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                "
          >
            <span className="
                text-6xl
                font-black
                tracking-tight
                text-zinc-800
                select-none
                ">
              {step.number}
            </span>

            <h3 className="mt-8 text-2xl font-semibold text-white">
              {step.title}
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              {step.description}
            </p>
          </div>
        ))}
     </div>

</div>
    </section>
  );
}