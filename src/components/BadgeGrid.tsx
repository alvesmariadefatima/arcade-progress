import { useState, useMemo } from "react";
import { Badge } from "@/lib/arcade-types";
import { Calendar, SortAsc, SortDesc, BookOpen, Gamepad2, Award } from "lucide-react";
import BadgeDetailModal from "./BadgeDetailModal";

const badgeTypeConfig: Record<string, { label: string; icon: typeof BookOpen; colorClass: string; borderClass: string; bgClass: string }> = {
  arcade_game: { label: "Arcade Game", icon: Gamepad2, colorClass: "text-secondary", borderClass: "border-secondary/30", bgClass: "bg-secondary/10" },
  skill_badge: { label: "Skill Badge", icon: Award, colorClass: "text-neon-green", borderClass: "border-neon-green/30", bgClass: "bg-neon-green/10" },
  course_short: { label: "Curso", icon: BookOpen, colorClass: "text-primary", borderClass: "border-primary/30", bgClass: "bg-primary/10" },
  course_long: { label: "Curso 60+", icon: BookOpen, colorClass: "text-accent", borderClass: "border-accent/30", bgClass: "bg-accent/10" },
};

interface BadgeGridProps {
  badges: Badge[];
}

type SortOrder = "newest" | "oldest";

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

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
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold font-display text-foreground">
          Badges Conquistados
          <span className="text-sm text-muted-foreground ml-2 font-body font-normal">
            ({badges.length})
          </span>
        </h3>
        <button
          onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-body text-muted-foreground hover:text-foreground transition-colors shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          {sortOrder === "newest" ? (
            <>Mais recentes <SortDesc className="w-3.5 h-3.5" /></>
          ) : (
            <>Mais antigos <SortAsc className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedBadges.map((badge, index) => {
          const config = badgeTypeConfig[badge.type || "course_short"] || badgeTypeConfig.course_short;
          const TypeIcon = config.icon;
          return (
            <div
              key={`${badge.name}-${index}`}
              onClick={() => setSelectedBadge(badge)}
              className={`bg-card rounded-2xl p-5 border ${config.borderClass} hover:shadow-lg transition-all duration-300 group cursor-pointer flex gap-4 items-start shadow-sm`}
              style={{
                animationDelay: `${0.6 + index * 0.06}s`,
                animationFillMode: "backwards",
              }}
            >
              <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
                {badge.image.startsWith("http") ? (
                  <img src={badge.image} alt={badge.name} className="w-14 h-14 object-contain" />
                ) : (
                  <span className="text-4xl">{badge.image}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground font-body leading-snug">
                  {badge.name}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-body uppercase tracking-wider ${config.bgClass} ${config.colorClass}`}>
                    <TypeIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                  <span className={`text-xs font-bold font-display ${config.colorClass}`}>
                    {badge.points}pt{badge.points > 1 ? "s" : ""}
                  </span>
                </div>
                {badge.earnedDate && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-body">
                      {badge.earnedDate}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <BadgeDetailModal
        badge={selectedBadge}
        open={!!selectedBadge}
        onOpenChange={(open) => !open && setSelectedBadge(null)}
      />
    </div>
  );
};

export default BadgeGrid;
