import { Trophy } from "lucide-react";

interface LeagueRankProps {
  league: string;
  points: number;
  leagueImage?: string;
  memberSince?: string;
}

const LEAGUES = [
  {
    name: "Bronze League",
    color: "from-amber-700/30 to-amber-900/10",
    border: "border-amber-700/40",
    textColor: "text-amber-500",
    dotColor: "bg-amber-500",
  },
  {
    name: "Silver League",
    color: "from-slate-400/30 to-slate-500/10",
    border: "border-slate-400/40",
    textColor: "text-slate-300",
    dotColor: "bg-slate-300",
  },
  {
    name: "Gold League",
    color: "from-yellow-500/30 to-yellow-600/10",
    border: "border-yellow-500/40",
    textColor: "text-yellow-400",
    dotColor: "bg-yellow-400",
  },
  {
    name: "Diamond League",
    color: "from-cyan-300/30 to-violet-400/10",
    border: "border-cyan-300/40",
    textColor: "text-cyan-300",
    dotColor: "bg-cyan-300",
  },
];

const LeagueRank = ({ league, points, leagueImage, memberSince }: LeagueRankProps) => {
  const currentIndex = LEAGUES.findIndex(
    (l) => l.name.toLowerCase() === league.toLowerCase()
  );
  const current = currentIndex >= 0 ? LEAGUES[currentIndex] : LEAGUES[0];

  return (
    <div
      className="glass rounded-2xl p-6 neon-border animate-scale-in"
      style={{ animationDelay: "0.35s", animationFillMode: "backwards" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold font-display text-foreground">
          Ranking Google Skills
        </h3>
      </div>

      {/* Current league highlight */}
      <div
        className={`flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r ${current.color} border ${current.border} mb-5`}
      >
        {leagueImage ? (
          <img src={leagueImage} alt={league} className="w-16 h-16 object-contain" />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center text-4xl">🏆</div>
        )}
        <div>
          <p className={`text-xl font-bold font-display ${current.textColor}`}>
            {league}
          </p>
          <p className="text-2xl font-bold font-display text-foreground">
            {points.toLocaleString()}
            <span className="text-sm text-muted-foreground ml-1 font-body font-normal">pontos</span>
          </p>
          {memberSince && (
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              Membro desde {memberSince}
            </p>
          )}
        </div>
      </div>

      {/* League progression */}
      <div className="flex items-center gap-1">
        {LEAGUES.map((l, i) => {
          const isActive = i === currentIndex;
          const isPast = i < currentIndex;
          return (
            <div key={l.name} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={`w-full h-2 rounded-full transition-all ${
                  isActive
                    ? `${l.dotColor} animate-pulse-glow`
                    : isPast
                    ? `${l.dotColor} opacity-60`
                    : "bg-muted"
                }`}
              />
              <span
                className={`text-[10px] font-body leading-tight text-center ${
                  isActive ? `${l.textColor} font-semibold` : "text-muted-foreground/50"
                }`}
              >
                {l.name.replace(" League", "")}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground font-body mt-3 text-center">
        Ligas são baseadas no ranking semanal entre jogadores
      </p>
    </div>
  );
};

export default LeagueRank;
