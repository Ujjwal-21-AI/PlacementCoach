const activities = [
  {
    title: "Resume analyzed",
    time: "2 hours ago",
  },
  {
    title: "Mock interview completed",
    time: "Today",
  },
  {
    title: "ATS score improved",
    time: "Yesterday",
  },
  {
    title: "Roadmap updated",
    time: "2 days ago",
  },
];

export default function ActivityCard() {
  return (
    <div className="rounded-3xl border border-white/5 bg-[#0D0D10] p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white">
          Recent Activity
        </h3>

        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
          Live
        </span>
      </div>

      <div className="mt-8 space-y-6">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-start gap-4"
          >
            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />

            <div>
              <p className="font-medium text-white">
                {activity.title}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}