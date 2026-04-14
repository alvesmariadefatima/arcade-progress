import { Award, Gamepad2, Cloud, ShieldCheck, BotMessageSquare, Lightbulb, Joystick, BookOpen, GraduationCap, ExternalLink } from "lucide-react";
import { Badge } from "@/lib/arcade-types";
import { BADGES_DATABASE, BadgeType, BadgeCategory, TRACK_CAPS, calculateScore, getCappedScore } from "@/lib/badges";

interface PointsBreakdownProps {
  badges: Badge[];
}

const tracks = [
  { key: BadgeCategory.FUNDAMENTOS_CLOUD, label: "Fundamentos da Computação em Google Cloud", icon: Cloud },
  { key: BadgeCategory.CYBERSECURITY, label: "Iniciante: Google Cloud Cybersecurity", icon: ShieldCheck },
  { key: BadgeCategory.LIDER_IA, label: "Líder de IA Generativa", icon: BotMessageSquare },
  { key: BadgeCategory.BEGINNER_IA, label: "Iniciante: Programa de Aprendizado Introdução à IA Generativa", icon: Lightbulb },
  { key: BadgeCategory.ARCADE, label: "Arcade Games", icon: Joystick },
] as const;

const PointsBreakdown = ({ badges }: PointsBreakdownProps) => {
  const completedNames = badges.map((b) => b.name);
  const scoreResult = calculateScore(completedNames);
  const recognizedSet = new Set(scoreResult.recognizedBadges);
  const recognizedBadgeDetails = BADGES_DATABASE.filter((b) => recognizedSet.has(b.name));

  const { cappedTotal, cappedByTrack } = getCappedScore(scoreResult);

  // Count completed per type
  const courseShortCompleted = recognizedBadgeDetails.filter((b) => b.type === BadgeType.COURSE_SHORT);
  const courseLongCompleted = recognizedBadgeDetails.filter((b) => b.type === BadgeType.COURSE_LONG);
  const skillBadgesCompleted = recognizedBadgeDetails.filter((b) => b.type === BadgeType.SKILL_BADGE);
  const arcadeEventsCompleted = recognizedBadgeDetails.filter((b) => b.type === BadgeType.ARCADE_EVENT);

  const activityTypes = [
    {
      icon: BookOpen, label: "Cursos < 60 min", unitPoints: 1,
      count: courseShortCompleted.length,
      earnedPts: courseShortCompleted.length * 1,
      color: "text-accent",
    },
    {
      icon: GraduationCap, label: "Cursos ≥ 60 min", unitPoints: 2,
      count: courseLongCompleted.length,
      earnedPts: courseLongCompleted.length * 2,
      color: "text-accent",
    },
    {
      icon: Gamepad2, label: "Arcade Game", unitPoints: 3,
      count: arcadeEventsCompleted.length,
      earnedPts: arcadeEventsCompleted.length * 3,
      color: "text-secondary",
    },
    {
      icon: Award, label: "Skill Badge", unitPoints: 3,
      count: skillBadgesCompleted.length,
      earnedPts: skillBadgesCompleted.length * 3,
      color: "text-primary",
    },
  ];

  return (
    <div
      className="w-full bg-card rounded-2xl p-5 border border-border shadow-md animate-scale-in"
      style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
    >
      <h3 className="text-lg font-bold font-display text-foreground mb-4">Tabela de Pontuação</h3>

      <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 mb-4">
        <span className="text-sm font-bold font-display text-foreground">Total Oficial</span>
        <span className="text-lg font-bold font-display text-primary tabular-nums">
          {cappedTotal} pts
        </span>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-bold font-display text-foreground">Pontuação por Trilha</h4>
        {tracks.map((track) => {
          const Icon = track.icon;
          const points = cappedByTrack[track.key];
          const max = TRACK_CAPS[track.key];
          const progress = max > 0 ? Math.min(100, (points / max) * 100) : 0;

          return (
            <div key={track.key}>
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm font-body text-foreground break-words">{track.label}</span>
                </div>
                <span className="text-sm font-bold font-display text-primary tabular-nums shrink-0">
                  {points}/{max}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full arcade-gradient transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold font-display text-foreground">Sistema de Pontos</h4>
          <a
            href="https://rsvp.withgoogle.com/events/arcade-facilitador/sistema-de-pontos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Ementa oficial</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {activityTypes.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.label}
                className="flex items-center justify-between rounded-xl border border-border bg-muted/30 px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center justify-center w-7 h-7 rounded-md bg-muted/50 shrink-0">
                    <Icon className={`w-4 h-4 ${activity.color} shrink-0`} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-body text-foreground block truncate">{activity.label}</span>
                    <span className="text-xs font-body text-muted-foreground">
                      ×1 = {activity.unitPoints} {activity.unitPoints === 1 ? "ponto" : "pontos"}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="text-sm font-bold font-display text-primary tabular-nums block">
                    {activity.earnedPts} pts
                  </span>
                  <span className="text-xs font-body text-muted-foreground tabular-nums">
                    {activity.count} concluído{activity.count !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PointsBreakdown;
