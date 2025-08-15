import GlassCard from "../components/GlassCard";

export default function AthleteResults({ athlete }: { athlete: any }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.75fr_0.75fr_1.5fr_1fr] auto-rows-auto">
      <GlassCard title="Training Benchmarks">
        <div className="space-y-3 text-sm">
          {Object.keys(athlete.technicals)
            .sort((a, b) => a.localeCompare(b))
            .map((event) => {
              const benchmarks: Record<string, number> = {
                "200": 22.42, "100": 11.34, "400": 51.47,
              };
              return (
                <div key={event} className="flex justify-between">
                  <span>{event}</span>
                  <span className="tabular-nums">{benchmarks[event]}</span>
                </div>
              );
            })}
        </div>
      </GlassCard>

      <GlassCard title="Personal Bests">
        <div className="space-y-3 text-sm">
          {Object.keys(athlete.technicals)
            .sort((a, b) => a.localeCompare(b))
            .map((event) => {
              const benchmarks: Record<string, number> = {
                "200": 20.65, "100": 10.44, "400": 49.72,
              };
              return (
                <div key={event} className="flex justify-between">
                  <span>{event}</span>
                  <span className="tabular-nums">{benchmarks[event]}</span>
                </div>
              );
            })}
        </div>
      </GlassCard>

      <GlassCard title="Recent Public Results">
        <div className="space-y-3 text-sm">
          {[
            { event: "100m", meet: "CL week 5, Sat", result: "11.24", pos: "1", link: "#" },
            { event: "100m", meet: "DL week 5, Thu", result: "10.91", pos: "2", link: "#" },
            { event: "200m", meet: "NC week 4, Tue", result: "20.65", pos: "4", link: "#" },
            { event: "200m", meet: "DL week 3, Thu", result: "21.27", pos: "1", link: "#" },
            { event: "200m", meet: "DL week 3, Tue", result: "21.35", pos: "1", link: "#" },
            { event: "100m", meet: "CL week 2, Sat", result: "11.15", pos: "1", link: "#" },
            { event: "200m", meet: "DL week 2, Thu", result: "21.72", pos: "2", link: "#" },
          ].map((r, i) => (
            <a key={i} href={r.link} className="flex justify-between rounded-xl bg-white/10 p-3 backdrop-blur hover:bg-white/20">
              <span>{r.event} {r.meet}</span>
              <span className="tabular-nums">Result: {r.result} - Position: {r.pos}</span>
            </a>
          ))}
        </div>
      </GlassCard>

      <GlassCard title="Result Details">
        <div className="space-y-3 text-sm">
          {[
            { event: "100m", meet: "CL week 5, Sat", link: "#" },
            { event: "100m", meet: "DL week 5, Thu", link: "#" },
            { event: "200m", meet: "NC week 4, Tue", link: "#" },
            { event: "200m", meet: "DL week 3, Thu", link: "#" },
            { event: "200m", meet: "DL week 3, Tue", link: "#" },
            { event: "100m", meet: "CL week 2, Sat", link: "#" },
            { event: "200m", meet: "DL week 2, Thu", link: "#" },
          ].map((r, i) => {
            const dailyForms = [54, 67, 76, 60, 48, 37, 26];
            const pushLevels = [4, 6, 9, 6, 5, 5, 7];
            const feedbacks  = ["Normal","Normal","Good","Normal","Great","Normal","Bad"];
            return (
              <a key={i} href={r.link} className="flex justify-between rounded-xl bg-white/10 p-3 backdrop-blur hover:bg-white/20">
                <span className="tabular-nums">Push: {pushLevels[i]} · State: {dailyForms[i]} · {feedbacks[i]}</span>
              </a>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
