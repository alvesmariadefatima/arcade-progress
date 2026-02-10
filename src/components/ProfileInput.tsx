import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gamepad2, Zap } from "lucide-react";

interface ProfileInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const ProfileInput = ({ onSubmit, isLoading }: ProfileInputProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (input: string): boolean => {
    const pattern = /^https?:\/\/(www\.)?(cloudskillsboost\.google|skills\.google)\/public_profiles\/.+/;
    return pattern.test(input.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Por favor, insira a URL do seu perfil.");
      return;
    }
    if (!validateUrl(url)) {
      setError("URL inválida. Verifique o link do perfil.");
      return;
    }
    setError("");
    onSubmit(url.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-slide-up">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-primary/30 mb-6 animate-float shadow-[0_0_30px_hsl(48_100%_55%/0.2)]">
          <Gamepad2 className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-3 text-glow-yellow">
          THE ARCADE
        </h1>
        <p className="text-base text-secondary font-display tracking-wider mb-1">
          POINTS CALCULATOR
        </p>
        <p className="text-sm text-muted-foreground font-body">
          Google Cloud Arcade 2026
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="glass rounded-xl p-6 neon-border">
          <label className="block text-sm font-medium text-muted-foreground mb-2 font-body">
            URL do Perfil Público
          </label>
          <Input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="https://www.skills.google/public_profiles/USER_ID"
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 h-12 text-base font-body"
          />
          {error && (
            <p className="text-destructive text-sm mt-2 font-body">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-lg font-semibold font-display arcade-gradient text-primary-foreground border-0 shadow-[0_0_20px_hsl(48_100%_55%/0.3)] hover:opacity-90 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Analisando seu perfil…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Calcular Pontos
            </span>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6 font-body">
        Cole a URL pública do seu perfil no Google Cloud Skills Boost
      </p>
    </div>
  );
};

export default ProfileInput;
