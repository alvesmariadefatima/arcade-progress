export interface Badge {
  name: string;
  image: string;
  points: number;
  earnedDate?: string;
  link?: string;
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
  if (points >= 65) return "Arcade Ranger";
  if (points >= 40) return "Arcade Trooper";
  if (points >= 20) return "Arcade Novice";
  return "Iniciante";
}

export function getNextLevel(points: number): { name: string; threshold: number } | null {
  if (points >= 65) return null;
  if (points >= 40) return { name: "Arcade Ranger", threshold: 65 };
  if (points >= 20) return { name: "Arcade Trooper", threshold: 40 };
  return { name: "Arcade Novice", threshold: 20 };
}

export function getLevelColor(level: string): string {
  switch (level) {
    case "Arcade Ranger": return "neon-green";
    case "Arcade Trooper": return "neon-cyan";
    case "Arcade Novice": return "neon-yellow";
    default: return "muted-foreground";
  }
}

// Mock data for demonstration
export const MOCK_PROFILE: ArcadeProfile = {
  name: "Maria Silva",
  avatar: "",
  points: 48,
  level: "Arcade Trooper",
  badges: [
    { name: "Cloud Foundations", image: "☁️", points: 5 },
    { name: "AI/ML Explorer", image: "🤖", points: 8 },
    { name: "Security Champion", image: "🛡️", points: 5 },
    { name: "Data Analytics", image: "📊", points: 10 },
    { name: "Cloud Architecture", image: "🏗️", points: 8 },
    { name: "DevOps Essentials", image: "⚙️", points: 5 },
    { name: "Kubernetes Master", image: "🐳", points: 7 },
  ],
};
