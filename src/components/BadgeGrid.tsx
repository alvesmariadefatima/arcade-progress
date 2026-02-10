import { useState, useMemo } from "react";
import { Badge } from "@/lib/arcade-types";
import { Calendar, SortAsc, SortDesc } from "lucide-react";

interface BadgeGridProps {
  badges: Badge[];
}

type SortOrder = "newest" | "oldest";

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const sortedBadges = useMemo(() => {
    if (!badges.length) return badges;
    return [...badges].sort((a, b) => {
      const dateA = a.earnedDate ? new Date(a.earnedDate.replace(' EST', '').replace(' EDT', '')).getTime() : 0;
      const dateB = b.earnedDate ? new Date(b.earnedDate.replace(' EST', '').replace(' EDT', '')).getTime() : 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [badges, sortOrder]);

  return (
    <div
      className="animate-scale-in"
      style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
    >
      {/* Header with filter */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold font-display text-foreground">
          Badges Conquistados
          <span className="text-sm text-muted-foreground ml-2 font-body font-normal">
            ({badges.length})
          </span>
        </h3>
        <button
          onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass neon-border text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          {sortOrder === "newest" ? (
            <>Mais recentes <SortDesc className="w-3.5 h-3.5" /></>
          ) : (
            <>Mais antigos <SortAsc className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>

      {/* Badge cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedBadges.map((badge, index) => (
          <div
            key={badge.name}
            className="glass rounded-2xl p-5 neon-border hover:glow-cyan transition-all duration-300 group cursor-default flex gap-4 items-start"
            style={{
              animationDelay: `${0.6 + index * 0.06}s`,
              animationFillMode: "backwards",
            }}
          >
            {/* Badge image */}
            <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
              {badge.image.startsWith("http") ? (
                <img
                  src={badge.image}
                  alt={badge.name}
                  className="w-14 h-14 object-contain"
                />
              ) : (
                <span className="text-4xl">{badge.image}</span>
              )}
            </div>

            {/* Badge info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground font-body leading-snug">
                {badge.name}
              </p>
              {badge.earnedDate && (
                <div className="flex items-center gap-1.5 mt-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground font-body">
                    {badge.earnedDate}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeGrid;
