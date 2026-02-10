import { Trophy, Star, Shield, Zap } from "lucide-react";

const tiers = [
  {
    name: "Arcade Novice",
    subtitle: "Iniciante",
    points: 20,
    description: "Para quem está começando, focado em concluir os primeiros jogos e habilidades básicas.",
    icon: Star,
    color: "text-neon-yellow",
    glowClass: "",
  },
  {
    name: "Arcade Trooper",
    subtitle: "Ativo",
    points: 40,
    description: "Para participantes consistentes, que acumulam pontos através de jogos, quizzes e emblemas.",
    icon: Shield,
    color: "text-primary",
    glowClass: "",
  },
  {
    name: "Arcade Ranger",
    subtitle: "Premium",
    points: 65,
    description: "Focado em usuários avançados que superam desafios complexos de nuvem.",
    icon: Zap,
    color: "text-neon-green",
    glowClass: "",
  },
  {
    name: "Champion Tier",
    subtitle: "Campeão",
    points: 75,
    description: "Atingir 75+ pontos e requisitos específicos qualifica para os prêmios máximos.",
    icon: Trophy,
    color: "text-neon-pink",
    glowClass: "glow-purple",
  },
];

const TiersTable = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 animate-scale-in" style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}>
      <h3 className="text-xl font-bold font-display text-foreground mb-5">
        Tiers & Pontuação
        <span className="text-sm text-muted-foreground ml-2 font-body font-normal">2025/2026</span>
      </h3>

      <div className="space-y-3">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.name}
              className={`glass rounded-2xl p-4 neon-border flex items-center gap-4 transition-all duration-300 hover:${tier.glowClass || "glow-cyan"}`}
            >
              <div className={`w-12 h-12 flex-shrink-0 rounded-xl bg-muted/50 flex items-center justify-center ${tier.color}`}>
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className={`font-semibold font-display text-sm ${tier.color}`}>{tier.name}</p>
                  <span className="text-xs text-muted-foreground font-body">({tier.subtitle})</span>
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
