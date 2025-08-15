import GlassCard from "../components/GlassCard";

type AthleteContractProps = {
  athlete: {
    club: string;
    contract: {
      wage?: string;
      years: number;
      weeks: number;
      seasonalWages?: { season: number; wage: string }[];
      happiness?: number | string;
      sponsor?: string;
      contracts?: Array<{ wage: number | string; duration: { years: number; weeks: number } }>;
      sponsorshipValue?: string;
      sponsorshipPct?: string;
      sponsorshipYears?: number;
      sponsorshipWeeks?: number;
      sponsorshipBonus?: string;
    };
  };
};

export default function AthleteContract({ athlete }: AthleteContractProps) {
  const { contract } = athlete;

  const rows =
    contract.contracts ??
    [{ wage: contract.wage ?? "—", duration: { years: contract.years, weeks: contract.weeks } }];

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-4 auto-rows-auto">
      {/* Club Contract */}
      <GlassCard title="Club Contract">
        <div className="space-y-3 text-sm">
          <div>Club: {athlete.club}</div>
          <div>
            Wage Brackets:
            <ul className="mt-1 list-disc list-inside">
              {rows.map((r, i) => (
                <li key={i}>
                  {typeof r.wage === "string" ? r.wage : `$${r.wage.toLocaleString("en-US")}`},{" "}
                  {r.duration.years ? `${r.duration.years}y ` : ""}
                  {r.duration.weeks}w
                </li>
              ))}
            </ul>
          </div>
          <div>
            Length: {contract.years ? `${contract.years}y ` : ""}
            {contract.weeks}w
          </div>
          <div>Happiness: {contract.happiness ?? "—"}</div>
        </div>
      </GlassCard>

      {/* Sponsorship */}
      <GlassCard title="Sponsorship">
        <div className="space-y-3 text-sm">
          <div>Sponsor: {contract.sponsor ?? "—"}</div>
          <div>Value: {contract.sponsorshipValue ?? "—"}</div>
          <div>Athlete%: {contract.sponsorshipPct ?? "—"}</div>
          <div>
            Length:{" "}
            {contract.sponsorshipYears !== undefined && contract.sponsorshipWeeks !== undefined
              ? `${contract.sponsorshipYears}y ${contract.sponsorshipWeeks}w`
              : "—"}
          </div>
          <div>Club Bonus: {contract.sponsorshipBonus ?? "—"}</div>
        </div>
      </GlassCard>
    </div>
  );
}
