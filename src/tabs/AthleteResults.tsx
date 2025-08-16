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
                "200": 20.55, "100": 10.44, "400": 49.72,
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
            { event: "100m", meet: "NCC week 11, Tue", result: "10.44", pos: "4", link: "#" },
            { event: "200m", meet: "DL week 10, Tue", result: "21.38", pos: "2", link: "#" },
            { event: "200m", meet: "CL week 9, Sat", result: "22.04", pos: "1", link: "#" },
            { event: "200m", meet: "CL week 8, Sat", result: "21.80", pos: "1", link: "#" },
            { event: "200m", meet: "DL week 8, Thu", result: "21.51", pos: "1", link: "#" },
            { event: "200m", meet: "WU23 week 7, Thu", result: "20.55", pos: "2", link: "#"},
            { event: "100m", meet: "DL week 6, Tue", result: "11.27", pos: "2", link: "#" },
            { event: "100m", meet: "CL week 5, Sat", result: "11.24", pos: "1", link: "#" },
            { event: "100m", meet: "DL week 5, Thu", result: "10.91", pos: "2", link: "#" },
            { event: "200m", meet: "NC week 4, Tue", result: "20.65", pos: "5", link: "#" },
            { event: "200m", meet: "DL week 3, Thu", result: "21.27", pos: "1", link: "#" },
            { event: "200m", meet: "DL week 3, Tue", result: "21.35", pos: "1", link: "#" },
            { event: "100m", meet: "CL week 2, Sat", result: "11.15", pos: "1", link: "#" },
            { event: "200m", meet: "DL week 2, Thu", result: "21.72", pos: "2", link: "#" },
          ].slice(0, 8).map((r, i) => (
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
            { event: "100m", meet: "NCC week 11, Tue", link: "#" },
            { event: "200m", meet: "DL week 10, Tue", link: "#" },
            { event: "200m", meet: "CL week 9, Sat", link: "#" },
            { event: "200m", meet: "CL week 8, Sat", link: "#" },
            { event: "200m", meet: "DL week 8, Thu", link: "#" },
            { event: "200m", meet: "WU23 week 7, Thu", link: "#" },
            { event: "100m", meet: "DL week 6, Tue", link: "#" },
            { event: "100m", meet: "CL week 5, Sat", link: "#" },
            { event: "100m", meet: "DL week 5, Thu", link: "#" },
            { event: "200m", meet: "NC week 4, Tue", link: "#" },
            { event: "200m", meet: "DL week 3, Thu", link: "#" },
            { event: "200m", meet: "DL week 3, Tue", link: "#" },
            { event: "100m", meet: "CL week 2, Sat", link: "#" },
            { event: "200m", meet: "DL week 2, Thu", link: "#" },
          ].slice(-8).map((r, i) => {
            const dailyForms = [72, 60, 55, 58, 62, 77, 64, 58, 58, 70, 60, 48, 37, 26].slice(0, 8);
            const pushLevels = [10, 6, 3, 3, 5, 10, 4, 4, 6, 9, 6, 5, 5, 7].slice(0, 8);
            const feedbacks  = ["Normal","Normal","Normal","Good","Good","Normal","Normal","Normal","Good","Normal","Normal","Great","Normal","Bad"];
            return (
              <a key={i} href={r.link} className="flex justify-between rounded-xl bg-white/10 p-3 backdrop-blur hover:bg-white/20">
                <span className="tabular-nums">Push: {pushLevels[i]} · State: {dailyForms[i]} · {feedbacks[i]}</span>
              </a>
            );
          })}
        </div>
      </GlassCard>

      <div className="md:col-span-4">
        <GlassCard title="Results (continued, full)">
          <div className="space-y-3 text-sm">
            {[
              { event: "100m", meet: "NCC week 11, Tue", result: "10.44", pos: "4", link: "#" },
              { event: "200m", meet: "DL week 10, Tue", result: "21.38", pos: "2", link: "#" },
              { event: "200m", meet: "CL week 9, Sat", result: "22.04", pos: "1", link: "#" },
              { event: "200m", meet: "CL week 8, Sat", result: "21.80", pos: "1", link: "#" },
              { event: "200m", meet: "DL week 8, Thu", result: "21.51", pos: "1", link: "#" },
              { event: "200m", meet: "WU23 week 7, Thu", result: "20.55", pos: "2", link: "#" },
              { event: "100m", meet: "DL week 6, Tue", result: "11.27", pos: "2", link: "#" },
              { event: "100m", meet: "CL week 5, Sat", result: "11.24", pos: "1", link: "#" },
              { event: "100m", meet: "DL week 5, Thu", result: "10.91", pos: "2", link: "#" },
              { event: "200m", meet: "NC week 4, Tue", result: "20.67", pos: "5", link: "#" },
              { event: "200m", meet: "DL week 3, Thu", result: "21.27", pos: "1", link: "#" },
              { event: "200m", meet: "DL week 3, Tue", result: "21.35", pos: "1", link: "#" },
              { event: "100m", meet: "CL week 2, Sat", result: "11.15", pos: "1", link: "#" },
              { event: "200m", meet: "DL week 2, Thu", result: "21.72", pos: "2", link: "#" },
            ].slice(8).map((r, i) => {
              const dailyForms = [72, 60, 55, 58, 62, 77, 64, 58, 58, 70, 60, 48, 37, 26].slice(8);
              const pushLevels = [10, 6, 3, 3, 5, 10, 4, 4, 6, 9, 6, 5, 5, 7].slice(8);
              const feedbacks  = ["Normal","Normal","Normal","Good","Good","Normal","Normal","Normal","Good","Normal","Normal","Great","Normal","Bad"].slice(8);
              return (
                <a key={i} href={r.link} className="flex justify-between rounded-xl bg-white/10 p-3 backdrop-blur hover:bg-white/20">
                  <span>{r.event} {r.meet}</span>
                  <span>Result: {r.result} · Position: {r.pos}</span>
                  <span className="tabular-nums">Push: {pushLevels[i]} · State: {dailyForms[i]} · {feedbacks[i]}
                  </span>
                </a>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
