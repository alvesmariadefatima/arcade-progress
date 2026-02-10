import { useState } from "react";
import ProfileInput from "@/components/ProfileInput";
import ResultsDashboard from "@/components/ResultsDashboard";
import TiersTable from "@/components/TiersTable";
import NavBar from "@/components/NavBar";
import ArcadeDecorations from "@/components/ArcadeDecorations";
import { ArcadeProfile, getArcadeLevel, AppState } from "@/lib/arcade-types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("idle");
  const [profile, setProfile] = useState<ArcadeProfile | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (url: string) => {
    setAppState("loading");

    try {
      const { data, error } = await supabase.functions.invoke('arcade-points', {
        body: { profileUrl: url },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Falha ao buscar dados do perfil');
      }

      const profileData = data.data;
      const arcadeProfile: ArcadeProfile = {
        name: profileData.name || 'Usuário',
        avatar: profileData.avatar || '',
        points: profileData.points || 0,
        level: getArcadeLevel(profileData.badges?.length || 0),
        league: profileData.league || '',
        leagueImage: profileData.leagueImage || '',
        memberSince: profileData.memberSince || '',
        badges: profileData.badges || [],
        badgeCount: profileData.badgeCount || 0,
      };

      setProfile(arcadeProfile);
      setAppState("results");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Não foi possível acessar os dados do usuário.';
      setAppState("error");
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
      // Go back to idle so user can retry
      setTimeout(() => setAppState("idle"), 3000);
    }
  };

  const handleReset = () => {
    setAppState("idle");
    setProfile(null);
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern relative overflow-hidden">
      <ArcadeDecorations />
      <NavBar onReset={handleReset} showResults={appState === "results"} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12 md:pt-24 md:pb-20 flex flex-col items-center justify-center min-h-screen">
        {appState === "idle" || appState === "loading" ? (
          <ProfileInput onSubmit={handleSubmit} isLoading={appState === "loading"} />
        ) : appState === "error" ? (
          <div className="text-center animate-slide-up">
            <p className="text-destructive text-lg mb-4 font-body">Erro ao buscar perfil</p>
            <button
              onClick={handleReset}
              className="text-primary underline font-body hover:opacity-80"
            >
              Tentar novamente
            </button>
          </div>
        ) : profile ? (
          <>
            <ResultsDashboard profile={profile} onReset={handleReset} />
            <TiersTable currentLevel={profile.level} userPoints={profile.badges.length} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Index;
