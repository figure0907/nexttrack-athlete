import GlassCard from "../components/GlassCard";

type PrestigePoint = {
  season: number;
  week: number; // 1..13
  age: { years: number; weeks: number };
  value: number; // 0..100
};

export default function AthletePrestige({
  athlete,
}: {
  athlete: { prestigeHistory?: PrestigePoint[] };
}) {
  const raw = athlete.prestigeHistory ?? [];

  // Oldest → newest
  const ordered = [...raw].sort((a, b) =>
    a.season === b.season ? a.week - b.week : a.season - b.season
  );

  const series = ordered.map((p) => p.value);
  const labels = ordered.map((p) => `S${p.season}W${p.week}`);
  const n = series.length;

  // ---------- CHART GEOMETRY (no distortion, fills horizontally) ----------
  // Use a wide viewBox so the chart spans the card without left/right gutters,
  // while keeping preserveAspectRatio so dots/lines don't warp.
  const VBW = 380; // viewBox width (wide)
  const VBH = 100; // viewBox height
  const padX = 22;  // small horizontal breathing room (set 0 to hug edges)
  const padY = 6;  // vertical padding

  const W = VBW - 2 * padX;
  const H = VBH - 2 * padY;

  const yFor = (v: number) => padY + (1 - v / 100) * H;
  const xFor = (i: number) => (n <= 1 ? VBW / 2 : padX + (i * W) / (n - 1));

  const pointStr = n > 0 ? series.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ") : "";

  // Thin x labels if there are many points
  const labelStep = n > 16 ? Math.ceil(n / 8) : 1;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-4 auto-rows-auto">
      <div className="md:col-span-4">
        <GlassCard title="Prestige Over Time">
          {n === 0 ? (
            <div className="text-sm text-white/70">No prestige history yet.</div>
          ) : (
            <div className="w-full overflow-hidden rounded-xl bg-white/10 p-3">
              <svg
                viewBox={`0 0 ${VBW} ${VBH}`}
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-64 md:h-72"
              >
                {/* horizontal grid at 0/25/50/75/100 */}
                {[0, 25, 50, 75, 100].map((val) => (
                  <g key={val}>
                    <line
                      x1={0}
                      x2={VBW}
                      y1={yFor(val)}
                      y2={yFor(val)}
                      stroke="rgba(255,255,255,.15)"
                      strokeWidth={0.5}
                      vectorEffect="non-scaling-stroke"
                    />
                    <text
                      x={1.5}
                      y={yFor(val) - 1.5}
                      fontSize={3}
                      fill="rgba(255,255,255,.5)"
                    >
                      {val}
                    </text>
                  </g>
                ))}

                {/* line */}
                <polyline
                  points={pointStr}
                  fill="none"
                  stroke="rgba(255,165,0,.9)"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                />

                {/* dots */}
                {series.map((v, i) => (
                  <circle
                    key={i}
                    cx={xFor(i)}
                    cy={yFor(v)}
                    r={2}
                    fill="rgba(255,165,0,1)"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {/* x labels in a responsive grid */}
              <div
                className="mt-2 grid gap-1 text-[10px] text-white/70"
                style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
              >
                {labels.map((l, i) => (
                  <div
                    key={i}
                    className={`text-center ${i % labelStep ? "opacity-40" : ""}`}
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </div>

      <div className="md:col-span-4">
        <GlassCard title="Recent Prestige Events">
          <div className="space-y-3 text-sm">
            {[
              { event: "100m", meet: "NCC week 11, Tue", result: "10.44", pos: "3", link: "#", season: "15" },
              { event: "200m", meet: "WU23 week 7, Thu", result: "20.55", pos: "2", link: "#", season: "15" },
              { event: "200m", meet: "NC week 4, Tue", result: "20.69", pos: "5", link: "#", season: "15" },
              { event: "200m", meet: "NCC week 11, Tue", result: "20.90", pos: "3", link: "#", season: "14" },
              { event: "200m", meet: "WU23 week 7, Thu", result: "20.75", pos: "4", link: "#", season: "14" },
              { event: "200m", meet: "NC week 4, Tue", result: "21.05", pos: "7", link: "#", season: "14" },
              { event: "200m", meet: "WCCQ week 13, Thu", result: "20.99", pos: "6", link: "#", season: "13" },
              { event: "200m", meet: "NCC week 11, Tue", result: "21.37", pos: "8", link: "#", season: "13" },
              { event: "200m", meet: "NC week 4, Tue", result: "21.25", pos: "10", link: "#", season: "13" },
              { event: "200m", meet: "WU20 week 7, Thu", result: "21.23", pos: "2", link: "#", season: "12" },
            ].map((r, i) => {
              const prestigeLevels  = ["50", "100", "44", "50", "62", "32", "30", "13", "16", "88"];
              return (
                <a key={i} href={r.link} className="flex justify-between rounded-xl bg-white/10 p-3 backdrop-blur hover:bg-white/20">
                  <span>{r.event} {r.meet} - Season: {r.season}</span>
                  <span>Result: {r.result} · Position: {r.pos}</span>
                  <span className="tabular-nums">Prestige Points: {prestigeLevels[i]}
                  </span>
                </a>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
