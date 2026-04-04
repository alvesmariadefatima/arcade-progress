import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProfileInput from "@/components/ProfileInput";
import SocialShareButtons from "@/components/SocialShareButtons";
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
  const [lastUrl, setLastUrl] = useState<string>("");
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      handleSubmit(urlParam);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (url: string) => {
    setLastUrl(url);
    setSearchParams({ url });
    const isRefresh = appState === "results" && profile !== null;
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setAppState("loading");
    }

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
      const arcadePoints = profileData.arcadePoints || profileData.badges?.reduce((s: number, b: any) => s + (b.points || 1), 0) || 0;
      const arcadeProfile: ArcadeProfile = {
        name: profileData.name || 'Usuário',
        avatar: profileData.avatar || '',
        points: arcadePoints,
        level: getArcadeLevel(arcadePoints),
        league: profileData.league || '',
        leagueImage: profileData.leagueImage || '',
        memberSince: profileData.memberSince || '',
        badges: profileData.badges || [],
        badgeCount: profileData.badgeCount || 0,
      };

      setProfile(arcadeProfile);
      setAppState("results");
      setIsRefreshing(false);
      if (isRefresh) {
        toast({ title: "Atualizado!", description: "Seus dados foram atualizados com sucesso." });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Não foi possível acessar os dados do usuário.';
      setIsRefreshing(false);
      if (!isRefresh) {
        setAppState("error");
        setTimeout(() => setAppState("idle"), 3000);
      }
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setAppState("idle");
    setProfile(null);
    setLastUrl("");
    setSearchParams({});
  };

  const handleRefresh = () => {
    if (lastUrl) {
      handleSubmit(lastUrl);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <ArcadeDecorations />
      <NavBar onReset={handleReset} showResults={appState === "results"} />

      {/* Results page rainbow side borders */}
      {appState === "results" && (
        <>
          <div className="fixed left-0 top-0 bottom-0 w-1 rainbow-bar z-20" />
          <div className="fixed right-0 top-0 bottom-0 w-1 rainbow-bar z-20" />
        </>
      )}

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12 md:pt-24 md:pb-20 flex flex-col items-center justify-center flex-1">
        {appState === "idle" || appState === "loading" ? (
          <>
            <ProfileInput onSubmit={handleSubmit} isLoading={appState === "loading"} />
            <div className="mt-6">
              <SocialShareButtons compact />
            </div>
          </>
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
            <ResultsDashboard profile={profile} onReset={handleReset} onRefresh={handleRefresh} isRefreshing={isRefreshing} />
            <TiersTable currentLevel={profile.level} userPoints={profile.points} />
          </>
        ) : null}
      </div>

      <footer className="relative z-10 py-6 text-center">
        {/* Footer rainbow bar */}
        <div className="flex justify-center gap-0.5 mb-4">
          <div className="w-16 h-1 rounded-full bg-primary" />
          <div className="w-16 h-1 rounded-full bg-secondary" />
          <div className="w-16 h-1 rounded-full bg-accent" />
          <div className="w-16 h-1 rounded-full bg-neon-green" />
        </div>
        <p className="font-body text-sm md:text-base">
          <span className="text-muted-foreground">Feito com </span>
          <span className="text-secondary text-lg">❤️</span>
          <span className="text-muted-foreground"> e carinho por </span>
          <a href="https://github.com/alvesmariadefatima" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Maria de Fátima Nunes Alves</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
