import { Shield, Star, Trophy } from "lucide-react";

interface LevelBadgeProps {
  level: string;
  points: number;
}

const levelConfig: Record<string, { icon: React.ReactNode; borderClass: string; bgClass: string; textColor: string }> = {
  "Marco Premium": {
    icon: <Trophy className="w-8 h-8" />,
    borderClass: "border-neon-green/40",
    bgClass: "from-neon-green/10 to-neon-green/5",
    textColor: "text-neon-green",
  },
  "Marco Standard": {
    icon: <Star className="w-8 h-8" />,
    borderClass: "border-primary/40",
    bgClass: "from-primary/10 to-primary/5",
    textColor: "text-primary",
  },
  "Iniciante": {
    icon: <Shield className="w-8 h-8" />,
    borderClass: "border-border",
    bgClass: "from-muted/20 to-muted/5",
    textColor: "text-muted-foreground",
  },
};

const LevelBadge = ({ level, points }: LevelBadgeProps) => {
  const config = levelConfig[level] || levelConfig["Iniciante"];

  return (
    <div
      className={`bg-card rounded-2xl p-6 border ${config.borderClass} bg-gradient-to-br ${config.bgClass} shadow-md animate-scale-in`}
      style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
    >
      <div className="flex items-center gap-4">
        <div className={config.textColor}>{config.icon}</div>
        <div>
          <p className="text-sm text-muted-foreground font-body">Nível Atual</p>
          <h3 className="text-2xl font-bold font-display text-foreground">{level}</h3>
        </div>
      </div>
      <div className="mt-4">
        <p className={`text-4xl font-bold font-display ${config.textColor}`}>
          {points}
          <span className="text-lg text-muted-foreground ml-1">pts</span>
        </p>
      </div>
    </div>
  );
};

export default LevelBadge;
