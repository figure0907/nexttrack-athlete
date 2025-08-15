// src/tabs/AthleteOverview.tsx
import React from "react";
import GlassCard from "../components/GlassCard";
import StatBar from "../components/StatBar";
import Meter from "../components/Meter";

export default function AthleteOverview({ athlete }: { athlete: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_0.8fr_1fr] gap-10 auto-rows-auto">
      {/* 1) Public Profile */}
      <GlassCard title="Public Profile">
        {/* Fixed */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Fixed</div>
          <div className="space-y-3 text-sm">
            <div>Age: {athlete.age.years}y {athlete.age.weeks}w</div>
            <div>Gender: {athlete.gender}</div>
            <div>Nationality: {athlete.nationality}</div>
          </div>
        </div>

        <div className="mt-8" />

        {/* Physical */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Physical</div>
          <div className="space-y-3 text-sm">
            <div>Height: {athlete.physical.height.toFixed(2)}</div>
            <div>Weight: {athlete.physical.weight.toFixed(2)}</div>
            <div>Durability: {athlete.physical.durability}</div>
          </div>
        </div>

        <div className="mt-8" />

        {/* Contract */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Contract</div>
          <div className="space-y-3 text-sm">
            <div>Club: {athlete.club}</div>
            {athlete.contract.contracts && athlete.contract.contracts.length > 0 ? (
              <>
                {/* Current contract */}
                <div>
                  Current Contract: ${athlete.contract.contracts[0].wage.toLocaleString()},{" "}
                  {athlete.contract.contracts[0].duration.years}y {athlete.contract.contracts[0].duration.weeks}w
                </div>

                {/* Total length */}
                <div>
                  Contract length: {(() => {
                    const totalWeeks = athlete.contract.contracts.reduce(
                      (sum, c) => sum + (c.duration.years * 13 + c.duration.weeks),
                      0
                    );
                    const years = Math.floor(totalWeeks / 13);
                    const weeks = totalWeeks % 13;
                    return `${years}y ${weeks}w`;
                  })()}
                </div>
              </>
            ) : (
              <div>
                Current Contract: {athlete.contract.wage}, {athlete.contract.years}y {athlete.contract.weeks}w
              </div>
            )}

            <div>
              Sponsorship: {athlete.contract.sponsorshipValue}, {athlete.contract.sponsorshipPct},{" "}
              {athlete.contract.sponsorshipYears}y {athlete.contract.sponsorshipWeeks}w
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 2) Training Profile */}
      <GlassCard title="Training Profile">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Peak</div>
        <div className="space-y-3 text-sm">
          <div>Peak Start Age: {athlete.training.peakStart.years}y {athlete.training.peakStart.weeks}w</div>
          <div>Decline Age: {athlete.training.declineAge.years}y {athlete.training.declineAge.weeks}w</div>
        </div>

        <div className="mt-8" />
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Potential</div>
        <div className="space-y-3 text-sm">
          <div>Base Potential: {athlete.training.basePotential}</div>
          <div>Potential Left: {athlete.training.potentialLeft}</div>
          <Meter value={athlete.training.potentialLeft} max={athlete.training.basePotential * 2} />
          <div>Training Loss: {athlete.training.trainingLoss}</div>
        </div>

        <div className="mt-8" />
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Training</div>
        <div className="space-y-3 text-sm">
          <div>Consistency: {athlete.training.consistency}</div>
          <div>Longevity: {athlete.training.longevity}</div>
          <div>Peak Retention: {athlete.training.peakRetention}</div>
          <div>Tenacity: {athlete.training.tenacity}</div>
        </div>
      </GlassCard>

      {/* 3) Mental Profile */}
      <GlassCard title="Mental Profile">
        {/* Career */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Career</div>
          <div className="space-y-3 text-sm">
            <div>Experience: {athlete.mental.experience ?? "—"}</div>
          </div>
        </div>

        <div className="mt-8" />

        {/* Marketing */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Marketing</div>
          <div className="space-y-3 text-sm">
            <div>Charisma: {athlete.mental.charisma}</div>
            <div>Negotiability: {athlete.mental.negotiability}</div>
          </div>
        </div>

        <div className="mt-8" />

        {/* Results */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Results</div>
          <div className="space-y-3 text-sm">
            <div>Focus: {athlete.mental.focus}</div>
            <div>Versatility: {athlete.mental.versatility}</div>
          </div>
        </div>
      </GlassCard>

      {/* 4) Status */}
      <GlassCard title="Status">
        <div className="space-y-4">
          <div>Form: {athlete.status.form}</div>
          <StatBar label="Form" value={athlete.status.form} max={100} />
          <div>State: {athlete.status.state}</div>
          <StatBar label="Form" value={athlete.status.state} max={100} />
          <div>Fatigue: {athlete.status.fatigue}</div>
          <StatBar label="Fatigue" value={athlete.status.fatigue} scale="fatigue" />
        </div>

        <div className="mt-8" />

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-white/70">Entries</div>
          <div className="grid gap-3">
            {athlete.entries.map((e: any) => (
              <a key={e.label} href={e.link} className="block rounded-xl bg-white/10 p-3 backdrop-blur hover:bg-white/20">
                {e.label}
              </a>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
