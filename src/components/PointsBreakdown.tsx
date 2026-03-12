import { Award, Gamepad2, Map, Shield, Brain, Sparkles, Zap, Info } from "lucide-react";
import { Badge } from "@/lib/arcade-types";
import { BADGES_DATABASE, BadgeType, calculateScore } from "@/lib/badges";

interface PointsBreakdownProps {
  badges: Badge[];
}

const tracks = [
  { key: "fundamentosCloud", label: "Fundamentos Cloud", icon: Map },
  { key: "cybersecurity", label: "Cybersecurity", icon: Shield },
  { key: "liderIA", label: "Líder IA", icon: Brain },
  { key: "beginnerIA", label: "Beginner IA", icon: Sparkles },
  { key: "arcade", label: "Arcade", icon: Zap },
] as const;

type TrackKey = (typeof tracks)[number]["key"];

const maxByTrack: Record<TrackKey, number> = {
  fundamentosCloud: 20,
  cybersecurity: 10,
  liderIA: 11,
  beginnerIA: 5,
  arcade: 3,
};

const PointsBreakdown = ({ badges }: PointsBreakdownProps) => {
  const completedNames = badges.map((b) => b.name);

  // Cálculo oficial baseado na lista de badges catalogadas do programa
  const scoreResult = calculateScore(completedNames);
  const recognizedSet = new Set(scoreResult.recognizedBadges);
  const recognizedBadgeDetails = BADGES_DATABASE.filter((b) => recognizedSet.has(b.name));

  // Cap each track at its max and compute capped total
  const cappedCategoryPoints: Record<string, number> = {};
  let cappedTotal = 0;
  for (const track of tracks) {
    const raw = scoreResult.categoryPoints[track.key];
    const max = maxByTrack[track.key];
    const capped = Math.min(raw, max);
    cappedCategoryPoints[track.key] = capped;
    cappedTotal += capped;
  }

  const skillBadgesCount = recognizedBadgeDetails.filter((b) => b.type === BadgeType.SKILL_BADGE).length;
  const skillBadgesPoints = recognizedBadgeDetails
    .filter((b) => b.type === BadgeType.SKILL_BADGE)
    .reduce((sum, b) => sum + b.points, 0);

  const arcadeEventsCount = recognizedBadgeDetails.filter((b) => b.type === BadgeType.ARCADE_EVENT).length;
  const arcadeEventsPoints = recognizedBadgeDetails
    .filter((b) => b.type === BadgeType.ARCADE_EVENT)
    .reduce((sum, b) => sum + b.points, 0);

  return (
    <div
      className="w-full glass rounded-2xl p-5 neon-border animate-scale-in"
      style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
    >
      <h3 className="text-lg font-bold font-display text-foreground mb-4">Tabela de Pontuação</h3>

      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2 mb-4">
        <span className="text-sm font-bold font-display text-foreground">Total Oficial</span>
        <span className="text-lg font-bold font-display text-primary text-glow-cyan tabular-nums">
          {cappedTotal} pts
        </span>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-bold font-display text-foreground">Pontuação por Trilha</h4>
        {tracks.map((track) => {
          const Icon = track.icon;
          const points = cappedCategoryPoints[track.key];
          const max = maxByTrack[track.key];
          const progress = max > 0 ? Math.min(100, (points / max) * 100) : 0;

          return (
            <div key={track.key}>
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-body text-foreground truncate">{track.label}</span>
                </div>
                <span className="text-sm font-bold font-display text-primary tabular-nums shrink-0">
                  {points}/{max}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-border space-y-2">
        <h4 className="text-sm font-bold font-display text-foreground">Resumo por Tipo Relevante</h4>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Award className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-body text-foreground truncate">Skill Badges</span>
          </div>
          <span className="text-sm font-bold font-display text-primary tabular-nums shrink-0">
            {skillBadgesCount} × 3 = {skillBadgesPoints}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Gamepad2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-body text-foreground truncate">Arcade Games/Eventos</span>
          </div>
          <span className="text-sm font-bold font-display text-primary tabular-nums shrink-0">
            {arcadeEventsCount} × 3 = {arcadeEventsPoints}
          </span>
        </div>
      </div>

      {scoreResult.unknownBadges.length > 0 && (
        <div className="mt-4 pt-3 border-t border-border flex items-start gap-2">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="text-xs font-body text-muted-foreground">
            {scoreResult.unknownBadges.length} badge{scoreResult.unknownBadges.length > 1 ? "s" : ""} fora da lista oficial e não somada{scoreResult.unknownBadges.length > 1 ? "s" : ""} no total.
          </span>
        </div>
      )}
    </div>
  );
};

export default PointsBreakdown;
