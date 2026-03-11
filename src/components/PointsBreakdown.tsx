import { BookOpen, Gamepad2, Award, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/lib/arcade-types";
import { calculateScore } from "@/lib/badges";

interface PointsBreakdownProps {
  badges: Badge[];
}

const typeCategories = [
  { type: "course_short", label: "Cursos (< 60 min)", icon: BookOpen, pointsEach: 1 },
  { type: "course_long", label: "Cursos (60+ min)", icon: BookOpen, pointsEach: 2 },
  { type: "arcade_game", label: "Arcade Games", icon: Gamepad2, pointsEach: 3 },
  { type: "skill_badge", label: "Skill Badges", icon: Award, pointsEach: 3 },
];

const programCategories = [
  { key: "fundamentosCloud" as const, label: "Fundamentos Cloud" },
  { key: "cybersecurity" as const, label: "Cybersecurity" },
  { key: "liderIA" as const, label: "Líder IA" },
  { key: "beginnerIA" as const, label: "Beginner IA" },
  { key: "arcade" as const, label: "Arcade" },
];

const PointsBreakdown = ({ badges }: PointsBreakdownProps) => {
  // Type-based breakdown (existing)
  const counts = typeCategories.map((cat) => {
    const matched = badges.filter((b) => b.type === cat.type);
    return { ...cat, count: matched.length, total: matched.reduce((s, b) => s + (b.points || cat.pointsEach), 0) };
  });
  const grandTotal = counts.reduce((s, c) => s + c.total, 0);

  // Category-based breakdown using calculateScore
  const badgeNames = badges.map((b) => b.name);
  const scoreResult = calculateScore(badgeNames);

  return (
    <div
      className="w-full glass rounded-2xl p-5 neon-border animate-scale-in"
      style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
    >
      <h3 className="text-lg font-bold font-display text-foreground mb-4">Detalhamento de Pontos</h3>

      {/* By type */}
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

      {/* By program category */}
      {scoreResult.recognizedBadges.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border">
          <h4 className="text-sm font-bold font-display text-foreground mb-3">Pontuação por Categoria</h4>
          <div className="space-y-2">
            {programCategories.map((cat) => {
              const pts = scoreResult.categoryPoints[cat.key];
              if (pts === 0) return null;
              return (
                <div key={cat.key} className="flex items-center justify-between">
                  <span className="text-sm font-body text-foreground">{cat.label}</span>
                  <span className="text-sm font-bold font-display text-primary">{pts} pts</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recognized badges count */}
      {scoreResult.recognizedBadges.length > 0 && (
        <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
          <span className="text-xs font-body text-muted-foreground">
            {scoreResult.recognizedBadges.length} badge{scoreResult.recognizedBadges.length > 1 ? "s" : ""} reconhecida{scoreResult.recognizedBadges.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Unknown badges */}
      {scoreResult.unknownBadges.length > 0 && (
        <div className="mt-2 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
          <span className="text-xs font-body text-muted-foreground">
            {scoreResult.unknownBadges.length} badge{scoreResult.unknownBadges.length > 1 ? "s" : ""} não catalogada{scoreResult.unknownBadges.length > 1 ? "s" : ""} no programa
          </span>
        </div>
      )}
    </div>
  );
};

export default PointsBreakdown;
