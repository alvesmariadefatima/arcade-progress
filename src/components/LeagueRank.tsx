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
    color: "from-amber-100 to-amber-50",
    border: "border-amber-300",
    textColor: "text-amber-700",
    dotColor: "bg-amber-500",
  },
  {
    name: "Silver League",
    color: "from-slate-100 to-slate-50",
    border: "border-slate-300",
    textColor: "text-slate-600",
    dotColor: "bg-slate-400",
  },
  {
    name: "Gold League",
    color: "from-yellow-100 to-yellow-50",
    border: "border-yellow-400",
    textColor: "text-yellow-700",
    dotColor: "bg-yellow-500",
  },
  {
    name: "Diamond League",
    color: "from-sky-100 to-violet-50",
    border: "border-sky-300",
    textColor: "text-sky-600",
    dotColor: "bg-sky-400",
  },
];

const LeagueRank = ({ league, points, leagueImage, memberSince }: LeagueRankProps) => {
  const currentIndex = LEAGUES.findIndex(
    (l) => l.name.toLowerCase() === league.toLowerCase()
  );
  const current = currentIndex >= 0 ? LEAGUES[currentIndex] : LEAGUES[0];

  return (
    <div
      className="bg-card rounded-2xl p-6 border border-border shadow-md animate-scale-in"
      style={{ animationDelay: "0.35s", animationFillMode: "backwards" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Trophy className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold font-display text-foreground">
          Ranking Google Skills
        </h3>
      </div>

      <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r ${current.color} border ${current.border} mb-5`}>
        {leagueImage ? (
          <img src={leagueImage} alt={league} className="w-16 h-16 object-contain" />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center text-4xl">🏆</div>
        )}
        <div>
          <p className={`text-xl font-bold font-display ${current.textColor}`}>{league}</p>
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

      <div className="flex items-center gap-1">
        {LEAGUES.map((l, i) => {
          const isActive = i === currentIndex;
          const isPast = i < currentIndex;
          return (
            <div key={l.name} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={`w-full h-2 rounded-full transition-all ${
                  isActive
                    ? `${l.dotColor} animate-pulse`
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
