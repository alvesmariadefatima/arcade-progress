import { Badge } from "@/lib/arcade-types";

interface BadgeGridProps {
  badges: Badge[];
}

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  return (
    <div
      className="animate-scale-in"
      style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
    >
      <h3 className="text-xl font-bold font-display text-foreground mb-4">
        Badges Conquistados
        <span className="text-sm text-muted-foreground ml-2 font-body font-normal">
          ({badges.length})
        </span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {badges.map((badge, index) => (
          <div
            key={badge.name}
            className="glass rounded-xl p-4 neon-border hover:glow-cyan transition-all duration-300 group cursor-default"
            style={{
              animationDelay: `${0.6 + index * 0.08}s`,
              animationFillMode: "backwards",
            }}
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {badge.image}
            </div>
            <p className="text-sm font-medium text-foreground font-body leading-tight">
              {badge.name}
            </p>
            <p className="text-xs text-primary font-display mt-1">
              +{badge.points} pts
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeGrid;
