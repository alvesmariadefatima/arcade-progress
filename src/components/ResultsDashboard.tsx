import { ArcadeProfile } from "@/lib/arcade-types";
import LevelBadge from "./LevelBadge";
import ProgressBar from "./ProgressBar";
import BadgeGrid from "./BadgeGrid";
import LeagueRank from "./LeagueRank";
import { User, Award, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface ResultsDashboardProps {
  profile: ArcadeProfile;
  onReset: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const ResultsDashboard = ({ profile, onReset, onRefresh, isRefreshing }: ResultsDashboardProps) => {
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
          {profile.points.toLocaleString()} pontos · {profile.badges.length} badges
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
          points={profile.points}
          leagueImage={profile.leagueImage}
          memberSince={profile.memberSince}
        />
      )}

      {/* Level + Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LevelBadge level={profile.level} points={profile.badges.length} />
        <ProgressBar points={profile.badges.length} />
      </div>

      {/* Badges */}
      {profile.badges.length > 0 && <BadgeGrid badges={profile.badges} />}
    </div>
  );
};

export default ResultsDashboard;
