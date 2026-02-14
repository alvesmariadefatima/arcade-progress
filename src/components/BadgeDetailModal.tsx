import { Badge } from "@/lib/arcade-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar, ExternalLink, BookOpen, Gamepad2, Award } from "lucide-react";

const typeLabels: Record<string, { label: string; icon: typeof BookOpen; colorClass: string }> = {
  arcade_game: { label: "Arcade Game · 3 pontos", icon: Gamepad2, colorClass: "text-neon-pink" },
  skill_badge: { label: "Skill Badge · 3 pontos", icon: Award, colorClass: "text-neon-green" },
  course_short: { label: "Curso · 1 ponto", icon: BookOpen, colorClass: "text-primary" },
  course_long: { label: "Curso 60+ · 2 pontos", icon: BookOpen, colorClass: "text-neon-yellow" },
};

interface BadgeDetailModalProps {
  badge: Badge | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BadgeDetailModal = ({ badge, open, onOpenChange }: BadgeDetailModalProps) => {
  if (!badge) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass neon-border sm:rounded-2xl border-0 max-w-sm p-0 overflow-hidden">
        {/* Badge image hero */}
        <div className="flex items-center justify-center pt-8 pb-4 bg-muted/30">
          <div className="w-28 h-28 rounded-2xl bg-muted/50 flex items-center justify-center">
            {badge.image.startsWith("http") ? (
              <img
                src={badge.image}
                alt={badge.name}
                className="w-24 h-24 object-contain"
              />
            ) : (
              <span className="text-6xl">{badge.image}</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pb-6 space-y-4">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-bold font-display text-foreground text-center">
              {badge.name}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-sm font-body">
              {(() => {
                const t = typeLabels[badge.type || "course_short"] || typeLabels.course_short;
                const Icon = t.icon;
                return (
                  <span className={`inline-flex items-center gap-1.5 ${t.colorClass}`}>
                    <Icon className="w-4 h-4" />
                    {t.label}
                  </span>
                );
              })()}
            </DialogDescription>
          </DialogHeader>

          {/* Details */}
          <div className="space-y-3">
            {badge.earnedDate && (
              <div className="flex items-center gap-3 glass rounded-xl px-4 py-3 neon-border">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground font-body">Conquistado em</p>
                  <p className="text-sm font-medium text-foreground font-body">{badge.earnedDate}</p>
                </div>
              </div>
            )}

            {badge.link && (
              <a
                href={badge.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass rounded-xl px-4 py-3 neon-border hover:glow-cyan transition-all duration-300 group"
              >
                <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-body">Ver no Google Skills</p>
                  <p className="text-sm font-medium text-primary font-body group-hover:text-glow-cyan truncate">
                    Abrir badge
                  </p>
                </div>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeDetailModal;
