export default function StatBar({
  label,
  value,
  max = 100,
  scale = "linear",
  showMax = false,
}: {
  label: string;
  value: number;
  max?: number;
  scale?: "linear" | "fatigue";
  showMax?: boolean;
}) {
  let proportion = 0;

  if (scale === "fatigue") {
    // Calibrated log mapping you’re using
    const alpha = 1.0523889260843562;
    const beta  = -5.35737680658086;
    const c     = 177.2350276398388;
    proportion = alpha * Math.log(value + c) + beta;
  } else {
    proportion = value / (max || 1);
  }

  proportion = Math.max(0, Math.min(1, proportion));

  let barColor = "bg-orange-500";
  if (scale === "fatigue") {
    const thresholds = [5, 10, 16, 24, 35, 50, 75, 110, 150];
    const colors = [
      "bg-emerald-500","bg-green-400","bg-lime-400","bg-yellow-300","bg-yellow-400",
      "bg-amber-400","bg-orange-400","bg-orange-600","bg-red-600",
    ];
    let idx = thresholds.findIndex((t) => value < t);
    if (idx === -1) idx = colors.length - 1;
    barColor = colors[idx];
  }

  const pct = proportion * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-white/80">
        <span>{label}</span>
        <span className="tabular-nums">
          {showMax ? `${value} / ${max}` : value}
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
        <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
