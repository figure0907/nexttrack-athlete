// src/tabs/AthleteContract.tsx
import React from "react";
import GlassCard from "../components/GlassCard";

type YW = { years: number; weeks: number };

function toWeeks(d: YW) {
  return (d.years ?? 0) * 13 + (d.weeks ?? 0);
}
function fromWeeks(total: number): YW {
  return { years: Math.floor(total / 13), weeks: total % 13 };
}
function fmtYW(d: YW) {
  const y = d.years || 0;
  const w = d.weeks || 0;
  const yPart = y ? `${y}y` : "";
  const wPart = `${w}w`;
  return [yPart, wPart].filter(Boolean).join(" ");
}
function money(n: number | string) {
  if (typeof n === "string") return n;
  return `$${n.toLocaleString("en-US")}`;
}

type AthleteContractProps = {
  athlete: {
    club: string;
    contract: {
      // old fields (kept for fallback)
      wage?: string;
      years?: number;
      weeks?: number;
      seasonalWages?: { season: number; wage: string }[];
      // new fields
      happiness?: number | string;
      sponsor?: string;
      contracts?: Array<{ wage: number | string; duration: YW }>;
      sponsorshipValue?: string;
      sponsorshipPct?: string;
      sponsorshipYears?: number;
      sponsorshipWeeks?: number;
    };
  };
};

export default function AthleteContract({ athlete }: AthleteContractProps) {
  const { contract } = athlete;

  // Prefer new `contracts` format; otherwise fall back to existing wage/years/weeks.
  const rows =
    contract.contracts ??
    ((): Array<{ wage: number | string; duration: YW }> => {
      // Fallback creates a single row from old fields so the UI still works.
      const y = contract.years ?? 0;
      const w = Math.max(0, Math.min(13, contract.weeks ?? 0));
      const wage = contract.wage ?? "—";
      return [{ wage, duration: { years: y, weeks: w } }];
    })();

  // Total duration
  const totalWeeks = rows.reduce((sum, r) => sum + toWeeks(r.duration), 0);
  const total = fromWeeks(totalWeeks);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-4 auto-rows-auto">
      {/* Club Contract (left half at md+) */}
      <GlassCard title="Club Contract">
        <div className="space-y-3 text-sm">
          <div>Club: {athlete.club}</div>

          <div>
            Wage Brackets:
            <ul className="mt-1 list-disc list-inside">
              {rows.map((r, i) => (
                <li key={i}>
                  {/* e.g. "$51,200, 4w" or "$62,380, 1y 3w" */}
                  {money(r.wage)}, {fmtYW(r.duration)}
                </li>
              ))}
            </ul>
          </div>

          <div>Length: {fmtYW(total)}</div>
          <div>Happiness: {contract.happiness ?? "—"}</div>
        </div>
      </GlassCard>

      {/* Sponsorship (next column; still left half overall) */}
      <GlassCard title="Sponsorship">
        <div className="space-y-3 text-sm">
          <div>Sponsor: {contract.sponsor ?? "—"}</div>
          <div>Value: {contract.sponsorshipValue ?? "—"}</div>
          <div>Athlete%: {contract.sponsorshipPct ?? "—"}</div>
          <div>
            Length:{" "}
            {contract.sponsorshipYears !== undefined &&
            contract.sponsorshipWeeks !== undefined
              ? `${contract.sponsorshipYears}y ${contract.sponsorshipWeeks}w`
              : "—"}
          </div>
          <div>Club Bonus: {contract.sponsorshipBonus ?? "—"}</div>
        </div>
      </GlassCard>

      {/* columns 3–4 intentionally unused */}
    </div>
  );
}
