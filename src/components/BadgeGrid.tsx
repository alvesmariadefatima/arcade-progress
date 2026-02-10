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
            <div className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center">
              {badge.image.startsWith('http') ? (
                <img src={badge.image} alt={badge.name} className="w-12 h-12 rounded object-contain" />
              ) : (
                <span className="text-3xl">{badge.image}</span>
              )}
            </div>
            <p className="text-sm font-medium text-foreground font-body leading-tight">
              {badge.name}
            </p>
            {badge.earnedDate && (
              <p className="text-xs text-muted-foreground font-body mt-1">
                {badge.earnedDate}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeGrid;
