import { BookOpen, Gamepad2, Award, Map, Shield, Brain, Sparkles, Zap, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/lib/arcade-types";
import { calculateScore } from "@/lib/badges";

interface PointsBreakdownProps {
  badges: Badge[];
}

/* ── Trilhas do programa ─────────────────────────────────────────── */
const programTracks = [
  { key: "fundamentosCloud" as const, label: "Fundamentos Cloud", icon: Map },
  { key: "cybersecurity" as const, label: "Cybersecurity", icon: Shield },
  { key: "liderIA" as const, label: "Líder IA", icon: Brain },
  { key: "beginnerIA" as const, label: "Beginner IA", icon: Sparkles },
  { key: "arcade" as const, label: "Arcade", icon: Zap },
];

/* ── Max points per track (sum of all badges in database) ──────── */
const trackMaxPoints: Record<string, number> = {
  fundamentosCloud: 29, // 4×2 + 7×3
  cybersecurity: 10,     // 5×2
  liderIA: 11,           // 4×2 + 1×3
  beginnerIA: 5,         // 5×1
  arcade: 3,             // 1×3
};

const PointsBreakdown = ({ badges }: PointsBreakdownProps) => {
  /* Type-based totals */
  const typeCounts = [
    { type: "course_short", label: "Cursos (< 60 min)", icon: BookOpen, pointsEach: 1 },
    { type: "course_long", label: "Cursos (≥ 60 min)", icon: BookOpen, pointsEach: 2 },
    { type: "skill_badge", label: "Skill Badges", icon: Award, pointsEach: 3 },
    { type: "arcade_game", label: "Arcade Games", icon: Gamepad2, pointsEach: 3 },
  ].map((cat) => {
    const matched = badges.filter((b) => b.type === cat.type);
    return { ...cat, count: matched.length, total: matched.reduce((s, b) => s + (b.points || cat.pointsEach), 0) };
  });

  const grandTotal = typeCounts.reduce((s, c) => s + c.total, 0);

  /* Category-based breakdown */
  const badgeNames = badges.map((b) => b.name);
  const scoreResult = calculateScore(badgeNames);

  return (
    <div
      className="w-full glass rounded-2xl p-5 neon-border animate-scale-in space-y-0"
      style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
    >
      {/* ── SECTION 1: Por Tipo de Badge ─────────────────────────── */}
      <div>
        <h3 className="text-base font-bold font-display text-foreground mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          Pontuação por Tipo
        </h3>

        <div className="space-y-2.5">
          {typeCounts.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.type} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-body text-foreground truncate">{cat.label}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground font-body tabular-nums">
                    {cat.count} × {cat.pointsEach}pt{cat.pointsEach > 1 ? "s" : ""}
                  </span>
                  <span className="text-sm font-bold font-display text-primary w-10 text-right tabular-nums">
                    {cat.total}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total row */}
        <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
          <span className="text-sm font-bold font-display text-foreground">Total Geral</span>
          <span className="text-lg font-bold font-display text-primary text-glow-cyan tabular-nums">
            {grandTotal} pts
          </span>
        </div>
      </div>

      {/* ── SECTION 2: Por Trilha do Programa ────────────────────── */}
      {scoreResult.recognizedBadges.length > 0 && (
        <div className="pt-5 mt-5 border-t border-border">
          <h3 className="text-base font-bold font-display text-foreground mb-3 flex items-center gap-2">
            <Map className="w-4 h-4 text-primary" />
            Pontuação por Trilha
          </h3>

          <div className="space-y-3">
            {programTracks.map((track) => {
              const pts = scoreResult.categoryPoints[track.key];
              const max = trackMaxPoints[track.key] || 0;
              const pct = max > 0 ? Math.min(100, (pts / max) * 100) : 0;
              const Icon = track.icon;

              return (
                <div key={track.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-body text-foreground truncate">{track.label}</span>
                    </div>
                    <span className="text-sm font-bold font-display text-primary tabular-nums shrink-0">
                      {pts}/{max}
                    </span>
                  </div>
                  {/* Mini progress bar */}
                  <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                      style={{ width: `${Math.max(pct > 0 ? 4 : 0, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── SECTION 3: Status de badges ──────────────────────────── */}
      <div className="pt-4 mt-4 border-t border-border space-y-2">
        {scoreResult.recognizedBadges.length > 0 && (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent-foreground shrink-0" />
            <span className="text-xs font-body text-muted-foreground">
              {scoreResult.recognizedBadges.length} badge{scoreResult.recognizedBadges.length > 1 ? "s" : ""} reconhecida{scoreResult.recognizedBadges.length > 1 ? "s" : ""} no programa
            </span>
          </div>
        )}
        {scoreResult.unknownBadges.length > 0 && (
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <span className="text-xs font-body text-muted-foreground">
              {scoreResult.unknownBadges.length} badge{scoreResult.unknownBadges.length > 1 ? "s" : ""} não catalogada{scoreResult.unknownBadges.length > 1 ? "s" : ""} no programa
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsBreakdown;
