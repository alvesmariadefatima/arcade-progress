import { ArcadeProfile } from "@/lib/arcade-types";
import LevelBadge from "./LevelBadge";
import ProgressBar from "./ProgressBar";
import BadgeGrid from "./BadgeGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";

interface ResultsDashboardProps {
  profile: ArcadeProfile;
  onReset: () => void;
}

const ResultsDashboard = ({ profile, onReset }: ResultsDashboardProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground font-body"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Nova consulta
        </Button>
      </div>

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
        <p className="text-sm text-muted-foreground font-body mt-1">Google Cloud Skills Boost</p>
      </div>

      {/* Level + Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LevelBadge level={profile.level} points={profile.points} />
        <ProgressBar points={profile.points} />
      </div>

      {/* Badges */}
      <BadgeGrid badges={profile.badges} />
    </div>
  );
};

export default ResultsDashboard;
