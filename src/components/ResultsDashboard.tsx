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
import logoArcade from "@/assets/logo-arcade.png";

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

  const officialPoints = cappedTotal;
  const officialLevel = getArcadeLevel(officialPoints);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img src={logoArcade} alt="Arcade Progress Logo" className="w-28 h-28 drop-shadow-lg" />
      </div>

      {/* Profile Card */}
      <div
        className="bg-card rounded-2xl p-6 border border-border shadow-lg animate-scale-in text-center"
        style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="text-left flex-1">
            <h2 className="text-xl font-bold font-display text-foreground">{profile.name}</h2>
            <p className="text-sm text-muted-foreground font-body">
              Pontuação total: <span className="font-bold text-foreground">{officialPoints}</span> pts
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/30">
              <span className="text-xs font-bold font-display text-neon-green">PROGRESSO</span>
            </div>
          </div>
        </div>
        {profile.league && (
          <div className="flex items-center gap-1.5 mt-3 justify-start">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-display">{profile.league}</span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-muted-foreground font-body">{profile.badges.length} badges</span>
          <Button
            onClick={onRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="ml-auto gap-2 font-body rounded-lg"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Atualizando…' : 'Atualizar dados'}
          </Button>
        </div>
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
