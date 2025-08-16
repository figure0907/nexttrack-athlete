import GlassCard from "../components/GlassCard";
import { mapFatigue } from "../components/StatBar";
import { athleteSeasonPlanDesiredTotal, publicResults } from "../data/athlete";

export default function AthleteSeasonalPlan({ athlete }: { athlete: any }) {
  return (
    <GlassCard title="Seasonal Plan">
      {/* Histogram: 13 weeks with observed tick and past color */}
      <div className="relative rounded-2xl bg-white/10 p-4">
        <div className="mb-2 text-sm text-white/80">Weekly Planned States</div>
        <div className="grid items-end gap-2 h-64 [grid-template-columns:repeat(13,minmax(0,1fr))]">
          {(() => {
            const currentWeek = athlete.currentWeek ?? 11; // 1..13
            return athlete.seasonPlanDesired.map((v: number, i: number) => {
              const pct = Math.max(0, Math.min(100, v));
              const isPast = i + 1 <= currentWeek;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="relative h-52 w-5 overflow-hidden rounded-md bg-white/20">
                    <div
                      className={`absolute bottom-0 left-0 right-0 ${
                        isPast ? "bg-sky-400" : "bg-gray-700"
                      }`}
                      style={{ height: `${pct}%` }}
                      title={`Week ${i + 1}: ${pct}`}
                    />
                    {isPast && (
                      <div
                        className="absolute left-0 right-0 h-[2px] bg-white/90 z-10"
                        style={{ bottom: `${i + 1 === 6 ? pct - 1 : pct}%` }}
                        title={`Observed: ${pct}`}
                      />
                    )}
                  </div>
                  <div className="text-[10px] text-white/70">W{i + 1}</div>
                </div>
              );
            });
          })()}
        </div>
        <div className="mt-4 text-center text-sm text-white/80">
          Total: {athleteSeasonPlanDesiredTotal}
        </div>
      </div>

      <div className="h-[20px]" />

      {/* Histogram: Fatigue (weeks 1–6 known, rest unknown) */}
      <div className="relative rounded-2xl bg-white/10 p-4">
        <div className="mb-2 text-sm text-white/80">Weekly Fatigue</div>
        <div className="grid items-end gap-2 h-64 [grid-template-columns:repeat(13,minmax(0,1fr))]">
          {[5, 10, 15, 25, 30, 33, 24, 27, 27, 29, 41, null, null].map((v, i) => {
            const heightPct = v == null ? 0 : mapFatigue(v).proportion * 100;
            const barColor  = v == null ? "bg-white/30" : mapFatigue(v).barColor;

            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="relative h-52 w-5 overflow-hidden rounded-md bg-white/20">
                  {v != null && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 ${barColor}`}
                      style={{ height: `${heightPct}%` }}
                      title={`Week ${i + 1}: ${v}`}
                    />
                  )}
                </div>
                <div className="text-[10px] text-white/70">W{i + 1}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-[20px]" />

      {/* Competitions by Week (built from the same Public Results list) */}
      <div className="relative rounded-2xl bg-white/10 p-4">
        <div className="mb-2 text-sm text-white/80">Competitions by Week</div>
        <div className="h-[20px]" />

        {(() => {
          // Build 13 arrays (W1..W13). We preserve the order of `publicResults`.
          const compsByWeek: string[][] = Array.from({ length: 13 }, () => []);

          publicResults.forEach((r) => {
            // r.meet example: "CL week 5, Sat"
            const weekMatch = r.meet.match(/week\s*(\d+)/i);
            const week = weekMatch ? Math.max(1, Math.min(13, parseInt(weekMatch[1], 10))) : null;
            if (!week) return;

            const series = r.meet.trim().split(" ")[0]; // "CL" | "DL" | "NC" ...
            const label = `${series} ${r.event}`;       // e.g., "CL 100m"
            compsByWeek[week - 1].push(label);
          });

          return (
            <div className="grid items-start gap-2 h-32 [grid-template-columns:repeat(13,minmax(0,1fr))]">
              {compsByWeek.map((labels: string[], i: number) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  {/* column "track" to align visually with charts above */}
                  <div className="relative h-24 w-14 overflow-visible">
                    {/* Overlay stack at top of column */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 space-y-1">
                      {labels.length > 0 ? (
                        labels.map((txt, idx) => (
                          <div
                            key={idx}
                            className="rounded-md bg-white/15 px-2.5 py-1 text-xs md:text-sm text-white text-center"
                            title={txt}
                          >
                            <div>{txt.split(" ")[0]}</div>
                            <div>{txt.split(" ")[1]}</div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-md bg-white/5 px-2.5 py-1 text-xs md:text-sm text-white/40 text-center">
                          —
                        </div>
                      )}
                    </div>
                  </div>
                  {/* week label */}
                  <div className="text-[10px] md:text-xs text-white/70">W{i + 1}</div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </GlassCard>
  );
}
