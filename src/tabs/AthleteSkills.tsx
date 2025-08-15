// src/tabs/AthleteSkills.tsx
import React from "react";
import GlassCard from "../components/GlassCard";
import SkillRow from "../components/SkillRow";
import { LABELS } from "../data/athlete";

type ShowMode = 0 | 1 | 2;

export default function AthleteSkills({ athlete }: { athlete: any }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-4 auto-rows-auto">
      {/* Track */}
      <GlassCard title="Track">
        {["ACC","END","PAC","ST1S","ST2M","ST3L","TSP"].map((k) => (
          <SkillRow
            key={k}
            label={LABELS[k]}
            value={athlete.skills[k]}
            cap={athlete.max_skills[k]}
            showValue={athlete.show_skills[k] as ShowMode}
            showCap={athlete.show_max_skills[k] as ShowMode}
          />
        ))}
      </GlassCard>

      {/* Field */}
      <GlassCard title="Field">
        {["AGI","BAL","COO","FLX","THR","VER"].map((k) => (
          <SkillRow
            key={k}
            label={LABELS[k]}
            value={athlete.skills[k]}
            cap={athlete.max_skills[k]}
            showValue={athlete.show_skills[k] as ShowMode}
            showCap={athlete.show_max_skills[k] as ShowMode}
          />
        ))}
      </GlassCard>

      {/* Physical */}
      <GlassCard title="Physical">
        {["EXP","POW","STR"].map((k) => (
          <SkillRow
            key={k}
            label={LABELS[k]}
            value={athlete.skills[k]}
            cap={athlete.max_skills[k]}
            showValue={athlete.show_skills[k] as ShowMode}
            showCap={athlete.show_max_skills[k] as ShowMode}
          />
        ))}
      </GlassCard>

      {/* Technicals (no caps) */}
      <GlassCard title="Technicals">
        {Object.entries(athlete.technicals).map(([event, v]) => (
          <SkillRow key={event} label={event} value={v as number} showValue={2} showCap={0} />
        ))}
      </GlassCard>
    </div>
  );
}
