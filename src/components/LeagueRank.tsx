import { Trophy, ChevronRight } from "lucide-react";

interface LeagueRankProps {
  league: string;
  points: number;
}

const LEAGUES = [
  { name: "Bronze League", minPoints: 0, color: "from-amber-700/30 to-amber-900/10", border: "border-amber-700/40", textColor: "text-amber-600" },
  { name: "Silver League", minPoints: 500, color: "from-slate-400/30 to-slate-500/10", border: "border-slate-400/40", textColor: "text-slate-300" },
  { name: "Gold League", minPoints: 2000, color: "from-yellow-500/30 to-yellow-600/10", border: "border-yellow-500/40", textColor: "text-yellow-400" },
  { name: "Platinum League", minPoints: 5000, color: "from-cyan-400/30 to-cyan-500/10", border: "border-cyan-400/40", textColor: "text-cyan-300" },
  { name: "Diamond League", minPoints: 10000, color: "from-violet-400/30 to-violet-500/10", border: "border-violet-400/40", textColor: "text-violet-300" },
];

const LeagueRank = ({ league, points }: LeagueRankProps) => {
  const currentIndex = LEAGUES.findIndex(
    (l) => l.name.toLowerCase() === league.toLowerCase()
  );
  const current = currentIndex >= 0 ? LEAGUES[currentIndex] : LEAGUES[0];
  const next = currentIndex < LEAGUES.length - 1 ? LEAGUES[currentIndex + 1] : null;

  const progressPercent = next
    ? Math.min(((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100, 100)
    : 100;

  return (
    <div
      className="glass rounded-2xl p-6 neon-border animate-scale-in"
      style={{ animationDelay: "0.35s", animationFillMode: "backwards" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold font-display text-foreground">
          Ranking Google Skills
        </h3>
      </div>

      {/* League progression */}
      <div className="space-y-2 mb-5">
        {LEAGUES.map((l, i) => {
          const isActive = i === currentIndex;
          const isPast = i < currentIndex;
          return (
            <div
              key={l.name}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-r ${l.color} border ${l.border} glow-cyan`
                  : isPast
                  ? "opacity-50"
                  : "opacity-30"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  isActive
                    ? "bg-primary animate-pulse-glow"
                    : isPast
                    ? "bg-muted-foreground"
                    : "bg-muted"
                }`}
              />
              <span
                className={`text-sm font-body flex-1 ${
                  isActive
                    ? `font-semibold ${l.textColor}`
                    : "text-muted-foreground"
                }`}
              >
                {l.name}
              </span>
              {isActive && (
                <span className="text-xs font-display text-primary">
                  {points.toLocaleString()} pts
                </span>
              )}
              {l.minPoints > 0 && !isActive && (
                <span className="text-xs text-muted-foreground/50 font-body">
                  {l.minPoints.toLocaleString()}+
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress to next league */}
      {next ? (
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-body mb-1.5">
            <span>{current.name}</span>
            <div className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3" />
              <span>{next.name}</span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full arcade-gradient transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground font-body mt-1.5">
            Faltam{" "}
            <span className="text-foreground font-semibold">
              {(next.minPoints - points).toLocaleString()}
            </span>{" "}
            pontos para {next.name}
          </p>
        </div>
      ) : (
        <p className="text-sm text-accent font-display text-glow-green">
          🏆 Liga máxima alcançada!
        </p>
      )}
    </div>
  );
};

export default LeagueRank;
