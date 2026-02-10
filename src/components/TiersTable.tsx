import { Trophy, Star, Shield, Zap, Check } from "lucide-react";

const tiers = [
  {
    name: "Arcade Novice",
    subtitle: "Iniciante",
    points: 20,
    icon: Star,
    color: "text-neon-yellow",
    description: "Para quem está começando, focado em concluir os primeiros jogos e habilidades básicas.",
  },
  {
    name: "Arcade Trooper",
    subtitle: "Ativo",
    points: 40,
    icon: Shield,
    color: "text-primary",
    description: "Para participantes consistentes, que acumulam pontos através de jogos, quizzes e emblemas.",
  },
  {
    name: "Arcade Ranger",
    subtitle: "Premium",
    points: 65,
    icon: Zap,
    color: "text-neon-green",
    description: "Focado em usuários avançados que superam desafios complexos de nuvem.",
  },
  {
    name: "Champion Tier",
    subtitle: "Campeão",
    points: 75,
    icon: Trophy,
    color: "text-neon-pink",
    description: "Atingir 75+ pontos e requisitos específicos qualifica para os prêmios máximos.",
  },
];

interface TiersTableProps {
  currentLevel?: string;
}

function matchesTier(tierName: string, currentLevel: string): boolean {
  const normalized = currentLevel.toLowerCase();
  if (tierName === "Arcade Novice") return normalized.includes("novice");
  if (tierName === "Arcade Trooper") return normalized.includes("trooper");
  if (tierName === "Arcade Ranger") return normalized.includes("ranger");
  if (tierName === "Champion Tier") return normalized.includes("champion");
  return false;
}

const TiersTable = ({ currentLevel }: TiersTableProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 animate-scale-in" style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}>
      <h3 className="text-xl font-bold font-display text-foreground mb-5">
        Tiers & Pontuação
        <span className="text-sm text-muted-foreground ml-2 font-body font-normal">2025/2026</span>
      </h3>

      <div className="space-y-3">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isActive = currentLevel ? matchesTier(tier.name, currentLevel) : false;

          return (
            <div
              key={tier.name}
              className={`glass rounded-2xl p-4 neon-border flex items-center gap-4 transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-primary/60 glow-cyan scale-[1.02]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <div className={`w-12 h-12 flex-shrink-0 rounded-xl bg-muted/50 flex items-center justify-center ${tier.color}`}>
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`font-semibold font-display text-sm ${tier.color}`}>{tier.name}</p>
                  <span className="text-xs text-muted-foreground font-body">({tier.subtitle})</span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[10px] font-bold font-body uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Você está aqui
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1 leading-relaxed">{tier.description}</p>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className={`text-lg font-bold font-display ${tier.color}`}>{tier.points}+</p>
                <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">pontos</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TiersTable;
