import { displayFromMode, tierBounds, tierIndexOf } from "../utils/tiers";

type ShowMode = 0 | 1 | 2; // 0=Hidden, 1=Word, 2=Value

export default function SkillRow({
  label,
  value,       // 0–100 (true)
  cap,         // 0–100 (true) optional
  showValue,   // 0=Hidden, 1=Word, 2=Value
  showCap,     // 0=Hidden, 1=Word, 2=Value
}: {
  label: string;
  value: number;
  cap?: number;
  showValue: ShowMode;
  showCap: ShowMode;
}) {
  const textValue = displayFromMode(value, showValue);
  const textCap   = cap !== undefined ? displayFromMode(cap, showCap) : undefined;

  // BAR FILL / RANGE
  const exactPct = Math.max(0, Math.min(100, value));

  let solidFrom = 0, solidTo = 0, hatchFrom = 0, hatchTo = 0;
  if (showValue === 2) {
    solidFrom = 0;
    solidTo = exactPct;
  } else if (showValue === 1) {
    const [lo, hi] = tierBounds(tierIndexOf(value));
    solidFrom = 0;
    solidTo = lo;
    hatchFrom = lo;
    hatchTo = hi;
  } else {
    hatchFrom = 0;
    hatchTo = 100;
  }

  // CAP ticks
  let ticks: Array<{ left: number; className: string }> = [];
  if (typeof cap === "number") {
    if (showCap === 2) {
      ticks.push({ left: Math.max(0, Math.min(100, cap)), className: "bg-white/80" });
    } else if (showCap === 1) {
      const [cLo, cHi] = tierBounds(tierIndexOf(cap));
      ticks.push({ left: cLo, className: "bg-white/50" });
      ticks.push({ left: cHi, className: "bg-white/50" });
    }
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-white/90">
        <span>{label}:</span>
        <span className="tabular-nums">
          {textValue}{textCap !== undefined ? ` / ${textCap}` : ""}
        </span>
      </div>

      <div className="relative mt-1 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
        {/* solid (minimum guaranteed) */}
        {solidTo > solidFrom && (
          <div
            className="absolute inset-y-0 left-0 bg-orange-500"
            style={{ left: `${solidFrom}%`, width: `${solidTo - solidFrom}%` }}
          />
        )}

        {/* hatched (possible up to) */}
        {hatchTo > hatchFrom && (
          <div
            className="absolute inset-y-0 left-0 opacity-65"
            style={{
              left: `${hatchFrom}%`,
              width: `${hatchTo - hatchFrom}%`,
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 6px, transparent 6px, transparent 12px)",
            }}
          />
        )}

        {/* cap ticks */}
        {ticks.map((t, i) => (
          <div key={i} className={`absolute -top-1 bottom-0 w-[2px] ${t.className}`} style={{ left: `${t.left}%` }} />
        ))}
      </div>
    </div>
  );
}
