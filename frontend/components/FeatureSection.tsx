import Link from "next/link";

const features = [
  {
    title: "Resume Analysis",
    description:
      "Get ATS-friendly feedback, improve your resume, and identify missing keywords.",
    href: "/resume",
  },
  {
    title: "Mock Interviews",
    description:
      "Practice role-based interview questions with instant AI feedback.",
    href: "/interview",
  },
  {
    title: "ATS Match",
    description:
      "Compare your resume against any job description before applying.",
    href: "/ats",
  },
  {
    title: "Career Roadmap",
    description:
      "Follow a personalized roadmap to improve your placement readiness.",
    href: "/roadmap",
  },
];

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      <div className="max-w-2xl">

        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          Features
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Everything in one place.
        </h2>

        <p className="mt-5 text-lg leading-8 text-zinc-400">
          Every tool you need to prepare for placements,
          built into one clean and focused platform.
        </p>

      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">

        {features.map((feature) => (

          <Link
            key={feature.title}
            href={feature.href}
            className="group rounded-3xl border border-white/5 bg-[#111113] p-8 transition-all duration-300 hover:border-white/10 hover:bg-[#151518]"
          >

            <h3 className="text-2xl font-semibold text-white">

              {feature.title}

            </h3>

            <p className="mt-4 leading-7 text-zinc-400">

              {feature.description}

            </p>

            <div className="mt-8 text-sm font-medium text-cyan-400 transition-all duration-300 group-hover:translate-x-1">

              Learn more →

            </div>

          </Link>

        ))}

      </div>
    </section>
  );
}