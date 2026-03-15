import { getNextLevel } from "@/lib/arcade-types";

interface ProgressBarProps {
  points: number;
}

const ProgressBar = ({ points }: ProgressBarProps) => {
  const next = getNextLevel(points);
  if (!next) {
    return (
      <div
        className="bg-card rounded-2xl p-6 border border-border shadow-md animate-scale-in"
        style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
      >
        <p className="text-sm text-muted-foreground font-body mb-2">Progresso</p>
        <div className="flex items-center gap-2">
          <span className="text-neon-green font-display font-bold text-lg">
            🎉 Nível máximo alcançado!
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-muted mt-3 overflow-hidden">
          <div className="h-full rounded-full arcade-gradient w-full" />
        </div>
      </div>
    );
  }

  const prevThreshold = points >= 40 ? 40 : 0;
  const range = next.threshold - prevThreshold;
  const progress = ((points - prevThreshold) / range) * 100;

  return (
    <div
      className="bg-card rounded-2xl p-6 border border-border shadow-md animate-scale-in"
      style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-muted-foreground font-body">Próximo nível</p>
        <p className="text-sm font-display text-primary font-semibold">{next.name}</p>
      </div>
      <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-neon-green transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2 font-body">
        <span className="text-foreground font-semibold">{points}</span> / {next.threshold} pontos
      </p>
    </div>
  );
};

export default ProgressBar;
