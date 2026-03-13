import { ArcadeProfile } from "@/lib/arcade-types";
import LevelBadge from "./LevelBadge";
import ProgressBar from "./ProgressBar";
import PointsBreakdown from "./PointsBreakdown";
import BadgeGrid from "./BadgeGrid";
import LeagueRank from "./LeagueRank";
import { User, Award, RefreshCw } from "lucide-react";
import { getArcadeLevel } from "@/lib/arcade-types";
import { Button } from "./ui/button";
import { calculateScore } from "@/lib/badges";

interface ResultsDashboardProps {
  profile: ArcadeProfile;
  onReset: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const trackMaxes: Record<string, number> = {
  fundamentosCloud: 20,
  cybersecurity: 10,
  liderIA: 11,
  beginnerIA: 5,
  arcade: 9,
};

const ResultsDashboard = ({ profile, onReset, onRefresh, isRefreshing }: ResultsDashboardProps) => {
  const scoreResult = calculateScore(profile.badges.map((b) => b.name));
  const cappedTotal = Object.entries(scoreResult.categoryPoints).reduce((sum, [key, pts]) => {
    const max = trackMaxes[key] ?? pts;
    return sum + Math.min(pts, max);
  }, 0);

  // Use official calculated score instead of scraped points
  const officialPoints = cappedTotal;
  const officialLevel = getArcadeLevel(officialPoints);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">

      {/* Profile Card */}
      <div
        className="glass rounded-2xl p-6 neon-border animate-scale-in text-center"
        style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-3">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <h2 className="text-2xl font-bold font-display text-foreground">{profile.name}</h2>
        {profile.league && (
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-display">{profile.league}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground font-body mt-1">
          {profile.badges.length} badges
        </p>
        <Button
          onClick={onRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
          className="mt-3 gap-2 font-body"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Atualizando…' : 'Atualizar dados'}
        </Button>
      </div>

      {/* League Ranking */}
      {profile.league && (
        <LeagueRank
          league={profile.league}
          points={officialPoints}
          leagueImage={profile.leagueImage}
          memberSince={profile.memberSince}
        />
      )}

      {/* Level + Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LevelBadge level={officialLevel} points={officialPoints} />
        <ProgressBar points={officialPoints} />
      </div>

      {/* Points Breakdown */}
      <PointsBreakdown badges={profile.badges} />

      {/* Badges */}
      {profile.badges.length > 0 && <BadgeGrid badges={profile.badges} />}
    </div>
  );
};

export default ResultsDashboard;
