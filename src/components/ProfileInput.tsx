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
    const pattern = /^https?:\/\/(www\.)?cloudskillsboost\.google\/public_profiles\/.+/;
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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl arcade-gradient mb-6 animate-float">
          <Gamepad2 className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-3 text-glow-cyan">
          ARCADE POINTS
        </h1>
        <p className="text-lg text-muted-foreground font-body">
          Google Arcade 2026 — Calculadora de Pontos
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
            placeholder="https://www.cloudskillsboost.google/public_profiles/USER_ID"
            className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 h-12 text-base font-body"
          />
          {error && (
            <p className="text-destructive text-sm mt-2 font-body">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-lg font-semibold font-display arcade-gradient text-primary-foreground border-0 glow-cyan hover:opacity-90 transition-all duration-300 disabled:opacity-50"
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
