import { Shield, Star, Trophy } from "lucide-react";

interface LevelBadgeProps {
  level: string;
  points: number;
}

const levelConfig: Record<string, { icon: React.ReactNode; glowClass: string; borderClass: string; bgClass: string }> = {
  "Marco Premium": {
    icon: <Trophy className="w-8 h-8" />,
    glowClass: "glow-green",
    borderClass: "border-neon-green/40",
    bgClass: "from-neon-green/20 to-neon-green/5",
  },
  "Marco Standard": {
    icon: <Star className="w-8 h-8" />,
    glowClass: "glow-cyan",
    borderClass: "border-neon-cyan/40",
    bgClass: "from-neon-cyan/20 to-neon-cyan/5",
  },
  "Iniciante": {
    icon: <Shield className="w-8 h-8" />,
    glowClass: "",
    borderClass: "border-muted-foreground/20",
    bgClass: "from-muted/20 to-muted/5",
  },
};

const LevelBadge = ({ level, points }: LevelBadgeProps) => {
  const config = levelConfig[level] || levelConfig["Iniciante"];

  return (
    <div
      className={`glass rounded-2xl p-6 border ${config.borderClass} ${config.glowClass} bg-gradient-to-br ${config.bgClass} animate-scale-in`}
      style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
    >
      <div className="flex items-center gap-4">
        <div className="text-primary">{config.icon}</div>
        <div>
          <p className="text-sm text-muted-foreground font-body">Nível Atual</p>
          <h3 className="text-2xl font-bold font-display text-foreground">{level}</h3>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold font-display text-primary text-glow-cyan">
          {points}
          <span className="text-lg text-muted-foreground ml-1">pts</span>
        </p>
      </div>
    </div>
  );
};

export default LevelBadge;
