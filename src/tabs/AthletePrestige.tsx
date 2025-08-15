// src/tabs/AthletePrestige.tsx
import React from "react";
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

  // —— CONFIG ——
  const FIT_TO_DATA = false;   // ← fixed 0–100 scale
  const P_X = 0;               // horizontal pad (% of viewBox width)
  const P_Y = 0;               // vertical pad (% of viewBox height)
  const DATA_MARGIN = 6;       // only used if FIT_TO_DATA = true

  // ViewBox is normalized 0..100 in both axes
  const plotW = 100 - 2 * P_X;
  const plotH = 100 - 2 * P_Y;

  // Y scale
  const clamp = (v: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));
  const dataMin = series.length ? Math.min(...series) : 0;
  const dataMax = series.length ? Math.max(...series) : 100;

  const yMin = FIT_TO_DATA ? clamp(dataMin - DATA_MARGIN) : 0;
  const yMax = FIT_TO_DATA ? clamp(dataMax + DATA_MARGIN) : 100;
  const ySpan = Math.max(1, yMax - yMin);

  const xFor = (i: number) =>
    n > 1 ? P_X + (i * plotW) / (n - 1) : 50;

  const yFor = (v: number) =>
    P_Y + (1 - (clamp(v, yMin, yMax) - yMin) / ySpan) * plotH;

  const points =
    n > 1 ? series.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ") : "";

  // Guide lines: show bottom/mid/top of current scale
  const guideVals = [yMin, (yMin + yMax) / 2, yMax];

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-4 auto-rows-auto">
      <div className="md:col-span-4">
        <GlassCard title="Prestige Over Time">
          {n > 1 ? (
            <div className="w-full overflow-hidden rounded-xl bg-white/10 p-3">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-[640px]"
              >
                {/* guide lines */}
                {guideVals.map((gv, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={yFor(gv)}
                    x2="100"
                    y2={yFor(gv)}
                    stroke="rgba(255,255,255,.15)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {/* polyline */}
                <polyline
                  fill="none"
                  stroke="rgba(255,165,0,.9)"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  points={points}
                />

                {/* dots */}
                {series.map((v, i) => (
                  <circle
                    key={i}
                    cx={xFor(i)}
                    cy={yFor(v)}
                    r="2.5"
                    fill="rgba(255,165,0,.9)"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {/* labels: exactly N columns, single line each */}
              <div
                className="mt-2 grid gap-2 text-[10px] text-white/70"
                style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
              >
                {labels.map((l, i) => (
                  <div key={i} className="text-center whitespace-nowrap">
                    {l}
                  </div>
                ))}
              </div>

              {/* scale caption */}
              <div className="mt-1 text-right text-[10px] text-white/60">
                Scale: 0–100
              </div>
            </div>
          ) : (
            <div className="text-sm text-white/70">No prestige history yet.</div>
          )}
        </GlassCard>
      </div>

      <div className="md:col-span-4">
        <GlassCard title="Recent Prestige Events">
          <div className="text-sm text-white/70">No recent changes.</div>
        </GlassCard>
      </div>
    </div>
  );
}
