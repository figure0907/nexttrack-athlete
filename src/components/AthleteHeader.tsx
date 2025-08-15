// src/components/AthleteHeader.tsx
import React from "react";

type AthleteHeaderProps = {
  athlete: { name: string; prestige: number; status: { health: string } };
  tabs: string[];
  tab: string;
  setTab: (t: string) => void;
};

export default function AthleteHeader({ athlete, tabs, tab, setTab }: AthleteHeaderProps) {
  return (
    <>
      {/* FIXED header + tabs */}
      <div className="fixed inset-x-0 top-0 z-40 pointer-events-none">
        {/* OPAQUE gray background */}
        <div className="relative pointer-events-auto">
          <div className="absolute inset-0 bg-[#666666]" aria-hidden="true" />

          <div className="relative mx-auto max-w-6xl px-6 py-4">
            {/* Header */}
            <div className="flex flex-wrap items-end justify-between gap-6 text-white">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">{athlete.name}</h1>
                <span className="inline-block rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold">
                  Health: {athlete.status.health}
                </span>
                <span className="ml-1 inline-block rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold">
                  Fatigue: Low
                </span>
              </div>

              {/* Prestige as button */}
              <button
                onClick={() => setTab("Prestige")}
                className={`rounded-xl px-5 py-3 text-right shadow-lg backdrop-blur-lg transition ${
                  tab === "Prestige"
                    ? "bg-orange-500 text-white shadow"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <div className="text-[11px] uppercase tracking-wide">Prestige</div>
                <div className="text-2xl font-extrabold tabular-nums">{athlete.prestige}</div>
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-3 flex gap-3">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    tab === t
                      ? "bg-orange-500 text-white shadow"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so content starts below fixed header */}
      <div className="h-[50px]" />
    </>
  );
}
