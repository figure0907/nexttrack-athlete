// src/data/athlete.ts
export type ShowMode = 0 | 1 | 2; // 0=Hidden, 1=Word, 2=Value

export const athlete = {
  name: "Michael Miller",
  age: { years: 23, weeks: 4 },
  gender: "M",
  nationality: "USA",
  club: "NextTrack",
  prestige: 80,

  prestigeHistory: [
    { season: 15, week: 3,  age: { years: 23, weeks: 1  }, value: 76 },
    { season: 14, week: 9,  age: { years: 22, weeks: 7  }, value: 70 },
    { season: 14, week: 2,  age: { years: 21, weeks: 13  }, value: 66 },
    { season: 13, week: 8,  age: { years: 21, weeks: 6  }, value: 63 },
    { season: 13, week: 1,  age: { years: 20, weeks: 12 }, value: 60 },
    { season: 12, week: 7,  age: { years: 20, weeks: 5  }, value: 57 },
    { season: 11, week: 13,  age: { years: 19, weeks: 11  }, value: 54 },
    { season: 11, week: 6,  age: { years: 19, weeks: 4  }, value: 52 },
    { season: 10, week: 12,  age: { years: 18, weeks: 10  }, value: 50 },
  ],

  status: {
    health: "Healthy",
    form: 56,
    state: 47,
    fatigue: 25,
  },

  physical: { height: 0.72, weight: 0.55, durability: 71, },

  contract: {
    wage: "$50,000",
    years: 1,
    weeks: 7,
    sponsorshipValue: "$30,000",
    sponsorshipPct: "40%",
    sponsorshipYears: 1,
    sponsorshipWeeks: 1,
    sponsorshipBonus: "$75,000",

    happiness: 96,
    sponsor: "SponsorX",
    contracts: [
      { wage: 54200, duration: { years: 0, weeks: 4 } },
      { wage: 65180, duration: { years: 1, weeks: 3 } },
    ],
  },

  training: {
    peakStart:  { years: 25, weeks: 3 },
    declineAge: { years: 29, weeks: 5 },

    basePotential: 85,
    potentialLeft: 46,
    trainingLoss: 2,

    consistency: 72,
    longevity: 48,
    peakRetention: 55,
    tenacity: 28,
  },

  mental: {
    charisma: 42,
    experience: 37,
    focus: 68,
    negotiability: 17,
    versatility: 90,
  },

  skills: {
    ACC: 42, END: 11, PAC: 13, ST1S: 16, ST2M: 11, ST3L: 8, TSP: 82,
    AGI: 5, BAL: 1, COO: 3, FLX: 5, THR: 2, VER: 8,
    EXP: 50, POW: 67, STR: 64,
  },

  show_skills: {
    ACC: 2, END: 2, PAC: 2, ST1S: 2, ST2M: 2, ST3L: 2, TSP: 2,
    AGI: 2, BAL: 2, COO: 2, FLX: 2, THR: 2, VER: 2,
    EXP: 2, POW: 2, STR: 2,
  } as Record<string, 0 | 1 | 2>,

  max_skills: {
    ACC: 52, END: 11, PAC: 13, ST1S: 16, ST2M: 11, ST3L: 8, TSP: 89,
    AGI: 5, BAL: 1, COO: 3, FLX: 5, THR: 2, VER: 8,
    EXP: 57, POW: 77, STR: 75,
  },

  show_max_skills: {
    ACC: 2, END: 2, PAC: 2, ST1S: 2, ST2M: 2, ST3L: 2, TSP: 2,
    AGI: 2, BAL: 2, COO: 2, FLX: 2, THR: 2, VER: 2,
    EXP: 2, POW: 2, STR: 2,
  } as Record<string, 0 | 1 | 2>,

  technicals: { "100": 62, "200": 67, "400": 46 },

  entries: [{ label: "100m DL week 6, Tue", link: "#" }],

  seasonPlanDesired: [15, 25, 46, 72, 60, 42, 40, 48, 55, 67, 78, 55, 30],
} as const;

// computed total
export const athleteSeasonPlanDesiredTotal =
  athlete.seasonPlanDesired.reduce((s, v) => s + v, 0);

// labels used in Skills tab
export const LABELS: Record<string, string> = {
  ACC: "Acceleration",
  END: "Endurance",
  PAC: "Pacing",
  ST1S: "Stamina S",
  ST2M: "Stamina M",
  ST3L: "Stamina L",
  TSP: "Top Speed",
  AGI: "Agility",
  BAL: "Balance",
  COO: "Coordination",
  FLX: "Flexibility",
  THR: "Throwing",
  VER: "Vertical",
  EXP: "Explosiveness",
  POW: "Power",
  STR: "Strength",
};

export const publicResults = [
  { event: "100m", meet: "CL week 5, Sat", result: "11.24", link: "#" },
  { event: "100m", meet: "DL week 5, Thu", result: "10.91", link: "#" },
  { event: "200m", meet: "NC week 4, Tue", result: "20.65", link: "#" },
  { event: "200m", meet: "DL week 3, Thu", result: "21.27", link: "#" },
  { event: "200m", meet: "DL week 3, Tue", result: "21.45", link: "#" },
  { event: "100m", meet: "CL week 2, Sat", result: "11.15", link: "#" },
  { event: "200m", meet: "DL week 2, Thu", result: "21.03", link: "#" },
];
