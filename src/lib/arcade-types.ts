export interface Badge {
  name: string;
  image: string;
  points: number;
  earnedDate?: string;
  link?: string;
  type?: string;
}

export interface ArcadeProfile {
  name: string;
  avatar: string;
  points: number;
  level: string;
  league?: string;
  leagueImage?: string;
  memberSince?: string;
  badges: Badge[];
  badgeCount?: number;
}

export type AppState = "idle" | "loading" | "results" | "error";

export function getArcadeLevel(points: number): string {
  if (points >= 60) return "Marco Premium";
  if (points >= 40) return "Marco Standard";
  return "Iniciante";
}

export function getNextLevel(points: number): { name: string; threshold: number } | null {
  if (points >= 60) return null;
  if (points >= 40) return { name: "Marco Premium", threshold: 60 };
  return { name: "Marco Standard", threshold: 40 };
}

export function getLevelColor(level: string): string {
  switch (level) {
    case "Marco Premium": return "neon-green";
    case "Marco Standard": return "neon-cyan";
    default: return "muted-foreground";
  }
}

export type BadgeType = "course_short" | "course_long" | "arcade_game" | "skill_badge";

export function getBadgePoints(type: BadgeType): number {
  switch (type) {
    case "course_short": return 1;
    case "course_long": return 2;
    case "arcade_game": return 3;
    case "skill_badge": return 3;
  }
}

// Mock data for demonstration
export const MOCK_PROFILE: ArcadeProfile = {
  name: "Maria Silva",
  avatar: "",
  points: 48,
  level: "Marco Standard",
  badges: [
    { name: "Cloud Foundations", image: "☁️", points: 1, type: "course_short" },
    { name: "AI/ML Explorer", image: "🤖", points: 3, type: "skill_badge" },
    { name: "Security Champion", image: "🛡️", points: 3, type: "arcade_game" },
    { name: "Data Analytics", image: "📊", points: 2, type: "course_long" },
  ],
};
