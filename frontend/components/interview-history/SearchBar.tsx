type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search role..."
      className="w-full rounded-2xl border border-white/10 bg-[#111113] px-6 py-4 text-white outline-none focus:border-cyan-400"
    />
  );
}