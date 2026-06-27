type RoleSelectorProps = {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  loading: boolean;
};

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "AI/ML Engineer",
  "Data Analyst",
  "Java Developer",
];

export default function RoleSelector({
  value,
  onChange,
  onGenerate,
  loading,
}: RoleSelectorProps) {
  return (
    <div className="rounded-[28px] border border-white/5 bg-[#111113] p-8">

      <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
        Interview Setup
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        Choose Your Role
      </h2>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-8 w-full rounded-2xl border border-white/10 bg-[#09090B] p-4 text-white outline-none focus:border-cyan-400"
      >
        <option value="">Select Role</option>

        {roles.map((role) => (
          <option key={role}>
            {role}
          </option>
        ))}

      </select>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="mt-8 w-full rounded-2xl bg-white py-4 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

    </div>
  );
}