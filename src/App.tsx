import React, { useState } from "react";
import { athlete } from "./data/athlete";
import AthleteContract from "./tabs/AthleteContract";
import AthleteHeader from "./components/AthleteHeader";
import AthleteOverview from "./tabs/AthleteOverview";
import AthleteSkills from "./tabs/AthleteSkills";
import AthleteResults from "./tabs/AthleteResults";
import AthleteSeasonalPlan from "./tabs/AthleteSeasonalPlan";
import AthletePrestige from "./tabs/AthletePrestige"; // ⬅️ NEW

export default function App() {
  // ⬇️ Added "Prestige" to the union; keeps everything else the same
  type AthleteTab =
    | "Overview"
    | "Contract"
    | "Skills"
    | "Results"
    | "Seasonal Plan"
    | "Prestige";

  const [tab, setTab] = useState<AthleteTab>("Overview");
  // ⬇️ Visible tabs remain exactly as before (Prestige is hidden)
  const tabs: Exclude<AthleteTab, "Prestige">[] = [
    "Overview",
    "Contract",
    "Skills",
    "Results",
    "Seasonal Plan",
  ];

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-10 px-6"
      style={{ backgroundColor: "#666666" }}
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <AthleteHeader athlete={athlete} tabs={tabs} tab={tab} setTab={setTab} />

        {/* Tab content */}
        {tab === "Overview" ? (
          <AthleteOverview athlete={athlete} />
        ) : tab === "Contract" ? (
          <AthleteContract athlete={athlete} />
        ) : tab === "Skills" ? (
          <AthleteSkills athlete={athlete} />
        ) : tab === "Results" ? (
          <AthleteResults athlete={athlete} />
        ) : tab === "Seasonal Plan" ? (
          <AthleteSeasonalPlan athlete={athlete} />
        ) : (
          <AthletePrestige athlete={athlete} />
        )}
      </div>
    </div>
  );
}
