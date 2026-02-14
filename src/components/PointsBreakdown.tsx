import { BookOpen, Gamepad2, Award } from "lucide-react";
import { Badge } from "@/lib/arcade-types";

interface PointsBreakdownProps {
  badges: Badge[];
}

const categories = [
  { type: "course_short", label: "Cursos (< 60 min)", icon: BookOpen, pointsEach: 1 },
  { type: "course_long", label: "Cursos (60+ min)", icon: BookOpen, pointsEach: 2 },
  { type: "arcade_game", label: "Arcade Games", icon: Gamepad2, pointsEach: 3 },
  { type: "skill_badge", label: "Skill Badges", icon: Award, pointsEach: 3 },
];

const PointsBreakdown = ({ badges }: PointsBreakdownProps) => {
  const counts = categories.map((cat) => {
    const matched = badges.filter((b) => b.type === cat.type);
    return { ...cat, count: matched.length, total: matched.reduce((s, b) => s + (b.points || cat.pointsEach), 0) };
  });

  const grandTotal = counts.reduce((s, c) => s + c.total, 0);

  return (
    <div
      className="w-full glass rounded-2xl p-5 neon-border animate-scale-in"
      style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
    >
      <h3 className="text-lg font-bold font-display text-foreground mb-4">Detalhamento de Pontos</h3>

      <div className="space-y-3">
        {counts.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.type} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-body text-foreground truncate">{cat.label}</span>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs text-muted-foreground font-body w-16 text-right">
                  {cat.count} × {cat.pointsEach}pt{cat.pointsEach > 1 ? "s" : ""}
                </span>
                <span className="text-sm font-bold font-display text-primary w-12 text-right">
                  {cat.total}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border mt-4 pt-3 flex items-center justify-between">
        <span className="text-sm font-bold font-display text-foreground">Total</span>
        <span className="text-lg font-bold font-display text-primary text-glow-cyan">{grandTotal} pts</span>
      </div>
    </div>
  );
};

export default PointsBreakdown;
