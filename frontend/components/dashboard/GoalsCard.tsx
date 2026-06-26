export default function GoalsCard() {
  const goals = [
    "Improve resume keywords",
    "Practice one mock interview",
    "Solve five DSA problems",
  ];

  return (
    <div className="rounded-3xl border border-white/5 bg-[#0D0D10] p-8">
      <h3 className="text-2xl font-semibold text-white">
        Today's Focus
      </h3>

      <div className="mt-8 space-y-6">
        {goals.map((goal) => (
          <div
            key={goal}
            className="flex items-center gap-4"
          >
            <div className="h-3 w-3 rounded-full bg-cyan-400" />

            <p className="text-lg text-zinc-300">
              {goal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}