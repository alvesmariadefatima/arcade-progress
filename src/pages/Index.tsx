import { useState } from "react";
import ProfileInput from "@/components/ProfileInput";
import ResultsDashboard from "@/components/ResultsDashboard";
import { ArcadeProfile, MOCK_PROFILE, getArcadeLevel, AppState } from "@/lib/arcade-types";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("idle");
  const [profile, setProfile] = useState<ArcadeProfile | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (url: string) => {
    setAppState("loading");
    setErrorMsg("");

    try {
      // Simulate API call — replace with real API/scraping integration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Use mock data with calculated level
      const data = { ...MOCK_PROFILE, level: getArcadeLevel(MOCK_PROFILE.points) };
      setProfile(data);
      setAppState("results");
    } catch {
      setErrorMsg("Não foi possível acessar os dados do usuário.");
      setAppState("error");
      toast({
        title: "Erro",
        description: "Não foi possível acessar os dados do usuário.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setAppState("idle");
    setProfile(null);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">
        {appState === "idle" || appState === "loading" ? (
          <ProfileInput onSubmit={handleSubmit} isLoading={appState === "loading"} />
        ) : appState === "error" ? (
          <div className="text-center animate-slide-up">
            <p className="text-destructive text-lg mb-4 font-body">{errorMsg}</p>
            <button
              onClick={handleReset}
              className="text-primary underline font-body hover:opacity-80"
            >
              Tentar novamente
            </button>
          </div>
        ) : profile ? (
          <ResultsDashboard profile={profile} onReset={handleReset} />
        ) : null}
      </div>
    </div>
  );
};

export default Index;
