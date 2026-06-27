type StatCardProps = {
  title: string;
  value: string | number;
  change: string;
};

export default function StatCard({
  title,
  value,
  change,
}: StatCardProps) {
  return (
    <div className="group rounded-3xl border border-white/5 bg-[#0D0D10] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-[#111114]">
      <p className="text-sm text-zinc-500">{title}</p>

      <h2 className="mt-4 text-5xl font-bold tracking-tight text-white">
        {value}
      </h2>

      <div className="mt-6 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-cyan-400" />

        <p className="text-sm font-medium text-cyan-400">
          {change}
        </p>
      </div>
    </div>
  );
}