import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Resume Analyzer",
      desc: "Upload a PDF resume and get ATS-friendly improvement suggestions, keyword gaps, and score feedback.",
    },
    {
      title: "Mock Interview Coach",
      desc: "Generate role-based interview questions and practice with instant AI feedback on your answers.",
    },
    {
      title: "Placement Roadmap",
      desc: "Get a personalized weekly plan based on your weak areas and target role.",
    },
  ];

  const stats = [
    { value: "82/100", label: "Resume Score" },
    { value: "74%", label: "Interview Readiness" },
    { value: "12", label: "Suggested Improvements" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-cyan-300">
              PLACEMENTCOACH
            </p>
            <p className="text-xs text-slate-400">
              AI-powered placement prep platform
            </p>
          </div>

          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#dashboard" className="hover:text-white">
              Dashboard
            </a>
            <a href="#roadmap" className="hover:text-white">
              Roadmap
            </a>
          </div>

          <Link
            href="/resume"
            className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Get Started
          </Link>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Built for students preparing for placements
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Build your placement confidence with{" "}
              <span className="text-cyan-300">AI</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              PlacementCoach helps students analyze resumes, practice mock
              interviews, and follow a personalized roadmap to become
              placement-ready faster.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/resume"
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Analyze Resume
              </Link>

              <Link
                href="/interview"
                className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Start Mock Interview
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-cyan-500/20 blur-3xl" />

            <div
              id="dashboard"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">Placement Dashboard</p>
                  <h2 className="text-xl font-semibold text-white">
                    Your AI prep summary
                  </h2>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-300">
                  Ready
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <InfoCard
                  title="Resume Score"
                  value="82/100"
                  detail="Good structure, but add stronger impact and keywords."
                />
                <InfoCard
                  title="Interview Readiness"
                  value="74%"
                  detail="Strong technical base. Improve answer clarity and depth."
                />
                <InfoCard
                  title="Roadmap Progress"
                  value="58%"
                  detail="Practice DSA, revise projects, and prepare HR answers."
                />
              </div>

              <div
                id="roadmap"
                className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4"
              >
                <p className="text-sm font-medium text-cyan-200">
                  Today’s roadmap
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li>• Improve 3 resume bullet points with measurable impact</li>
                  <li>• Practice 2 mock interview questions</li>
                  <li>• Solve 5 array problems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section id="features" className="grid gap-6 pb-10 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

function InfoCard({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{title}</p>
        <span className="h-2 w-2 rounded-full bg-cyan-300" />
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}