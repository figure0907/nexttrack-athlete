export default function Meter({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  return (
    <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
      <div className="h-full bg-orange-500" style={{ width: `${pct}%` }} />
    </div>
  );
}
