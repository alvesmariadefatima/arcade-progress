import { Trophy, Shield, Check, ChevronRight, Sparkles } from "lucide-react";

const tiers = [
  { name: "Marco Standard", subtitle: "40 Pontos", points: 40, icon: Shield, color: "text-primary", bgColor: "bg-primary/15", borderColor: "border-primary/40", glowClass: "shadow-[0_0_15px_hsl(185_100%_50%/0.3)]", activeGlow: "shadow-[0_0_25px_hsl(185_100%_50%/0.5),0_0_50px_hsl(185_100%_50%/0.2)]", activeBorder: "border-primary/70", activeBg: "bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" },
  { name: "Marco Premium", subtitle: "60 Pontos", points: 60, icon: Trophy, color: "text-neon-green", bgColor: "bg-neon-green/15", borderColor: "border-neon-green/40", glowClass: "shadow-[0_0_15px_hsl(145_100%_50%/0.3)]", activeGlow: "shadow-[0_0_25px_hsl(145_100%_50%/0.5),0_0_50px_hsl(145_100%_50%/0.2)]", activeBorder: "border-neon-green/70", activeBg: "bg-gradient-to-r from-neon-green/20 via-neon-green/10 to-transparent" },
];

interface TiersTableProps {
  currentLevel?: string;
  userPoints?: number;
}

function getTierIndex(currentLevel: string): number {
  const n = currentLevel.toLowerCase();
  if (n.includes("premium")) return 1;
  if (n.includes("standard")) return 0;
  return -1;
}

const TiersTable = ({ currentLevel, userPoints = 0 }: TiersTableProps) => {
  const activeIndex = currentLevel ? getTierIndex(currentLevel) : -1;

  // Calculate next tier info
  const nextTier = activeIndex < 3 ? tiers[activeIndex + 1] : null;
  const pointsToNext = nextTier ? nextTier.points - userPoints : 0;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 animate-scale-in" style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}>
      <h3 className="text-xl font-bold font-display text-foreground mb-2">
        Sua Jornada Arcade
      </h3>
      <p className="text-sm text-muted-foreground font-body mb-6">
        {nextTier
          ? `Faltam ${pointsToNext} ponto${pointsToNext !== 1 ? "s" : ""} para ${nextTier.name}`
          : "Você atingiu o nível máximo! 🏆"}
      </p>

      {/* Progress tracker */}
      <div className="relative">
        {/* Vertical line connecting tiers */}
        <div className="absolute left-6 top-6 bottom-6 w-px bg-border" />
        {/* Filled progress line */}
        {activeIndex >= 0 && (
          <div
            className="absolute left-6 top-6 w-px bg-primary transition-all duration-700"
            style={{
              height: `${((activeIndex + 0.5) / tiers.length) * 100}%`,
            }}
          />
        )}

        <div className="space-y-0">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;
            const isLocked = index > activeIndex + 1;

            // Progress within the current active tier
            let progressPercent = 0;
            if (isActive && nextTier) {
              const prevPoints = index > 0 ? tiers[index - 1].points : 0;
              const range = nextTier.points - prevPoints;
              progressPercent = Math.min(100, Math.max(0, ((userPoints - tier.points) / (nextTier.points - tier.points)) * 100));
            }
            if (isCompleted) progressPercent = 100;

            return (
              <div key={tier.name} className="relative flex items-stretch gap-4">
                {/* Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      isActive
                        ? `${tier.bgColor} ${tier.borderColor} ${tier.glowClass} scale-110`
                        : isCompleted
                        ? `${tier.bgColor} ${tier.borderColor}`
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className={`w-5 h-5 ${tier.color}`} />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive || isCompleted ? tier.color : "text-muted-foreground/50"}`} />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 mb-3 rounded-xl p-4 transition-all duration-500 ${
                    isActive
                      ? `glass ${tier.borderColor} border ${tier.glowClass}`
                      : isCompleted
                      ? "glass border border-border/50"
                      : "bg-muted/10 border border-border/30"
                  } ${isLocked ? "opacity-40" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-bold font-display text-sm ${isActive || isCompleted ? tier.color : "text-muted-foreground"}`}>
                        {tier.name}
                      </p>
                      {isActive && (
                        <span className="text-[10px] font-bold font-body uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full animate-pulse">
                          Atual
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] font-body text-neon-green uppercase tracking-wider">✓ Concluído</span>
                      )}
                    </div>
                    <span className={`text-sm font-bold font-display ${isActive || isCompleted ? tier.color : "text-muted-foreground/50"}`}>
                      {tier.points} pts
                    </span>
                  </div>

                  {/* Progress bar for active tier */}
                  {isActive && nextTier && (
                    <div className="mt-2 mb-2">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-body mb-1">
                        <span>{userPoints} pts</span>
                        <span className="flex items-center gap-0.5">
                          <ChevronRight className="w-3 h-3" />
                          {nextTier.name} ({nextTier.points} pts)
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                          style={{ width: `${Math.max(5, progressPercent)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <p className={`text-xs font-body leading-relaxed ${isActive || isCompleted ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                    {tier.subtitle} — {isLocked ? "Bloqueado" : isCompleted ? "Nível concluído" : isActive ? "Você está neste nível" : "Próximo objetivo"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TiersTable;
