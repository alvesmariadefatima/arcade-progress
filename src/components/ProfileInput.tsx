import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Zap, AlertTriangle, HelpCircle, History } from "lucide-react";
import logoArcade from "@/assets/logo-arcade.png";

const HISTORY_KEY = "arcade-url-history";
const MAX_HISTORY = 5;

function loadHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveToHistory(url: string) {
  const history = loadHistory().filter((u) => u !== url);
  history.unshift(url);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

interface ProfileInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const ProfileInput = ({ onSubmit, isLoading }: ProfileInputProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [history, setHistory] = useState<string[]>(loadHistory);
  const [showHistory, setShowHistory] = useState(false);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputWrapperRef.current && !inputWrapperRef.current.contains(e.target as Node)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateUrl = (input: string): boolean => {
    const pattern = /^https?:\/\/(www\.)?(cloudskillsboost\.google|skills\.google)\/public_profiles\/.+/;
    return pattern.test(input.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setModalMessage("Por favor, insira a URL do seu perfil público do Google Cloud Skills Boost.");
      setShowModal(true);
      return;
    }
    if (!validateUrl(url)) {
      setModalMessage("URL inválida. O link deve seguir o formato:\nhttps://www.skills.google/public_profiles/SEU_ID");
      setShowModal(true);
      return;
    }
    setError("");
    const trimmed = url.trim();
    saveToHistory(trimmed);
    setHistory(loadHistory());
    setShowHistory(false);
    onSubmit(trimmed);
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-slide-up">
      <div className="text-center mb-10">
        <img src={logoArcade} alt="Arcade Progress Logo" className="w-32 h-32 mb-6 animate-float drop-shadow-[0_0_30px_hsl(48_100%_55%/0.3)]" />
        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-3 text-glow-yellow">
          ARCADE PROGRESS
        </h1>
        <p className="text-base text-secondary font-display tracking-wider mb-1">
          ACOMPANHE SUA JORNADA
        </p>
        <p className="text-sm text-muted-foreground font-body">
          Google Arcade Facilitadores Brasil 2026
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="glass rounded-xl p-6 neon-border">
          <label className="block text-sm font-medium text-muted-foreground mb-2 font-body">
            URL do Perfil Público
          </label>
          <div ref={inputWrapperRef} className="relative">
            <Input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              onFocus={() => history.length > 0 && setShowHistory(true)}
              placeholder="https://www.skills.google/public_profiles/USER_ID"
              className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/50 h-12 text-base font-body"
            />
            {showHistory && history.length > 0 && (
              <ul className="absolute z-50 left-0 right-0 top-full mt-1 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
                {history.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setUrl(item);
                        setShowHistory(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-body text-left text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors truncate"
                    >
                      <History className="w-3.5 h-3.5 shrink-0 text-muted-foreground/50" />
                      <span className="truncate">{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
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

      <button
        type="button"
        onClick={() => setShowHelp(true)}
        className="mx-auto mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl glass neon-border text-sm font-body text-primary hover:bg-primary/10 transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        Como encontrar minha URL?
      </button>

      <p className="text-center text-sm text-muted-foreground mt-4 font-body">
        Cole a URL pública do seu perfil no Google Cloud Skills Boost
      </p>

      {/* Help Modal */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="glass neon-border sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                <HelpCircle className="w-5 h-5 text-accent" />
              </div>
              <DialogTitle className="font-display text-foreground">Como encontrar sua URL</DialogTitle>
            </div>
            <DialogDescription className="font-body text-muted-foreground pt-2">
              Siga os passos abaixo para copiar o link do seu perfil público:
            </DialogDescription>
            <div className="mt-3 p-4 rounded-lg bg-muted/50 border border-border text-sm font-body text-muted-foreground space-y-2">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Acesse <a href="https://www.cloudskillsboost.google" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">cloudskillsboost.google</a></li>
                <li>Faça login na sua conta Google</li>
                <li>Clique na sua <strong className="text-foreground">foto de perfil</strong> (canto superior direito)</li>
                <li>Selecione <strong className="text-foreground">"Perfil Público"</strong></li>
                <li>Copie a <strong className="text-foreground">URL da barra de endereço</strong> do navegador</li>
              </ol>
              <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border">
                Exemplo: <span className="text-primary font-mono text-xs">https://www.skills.google/public_profiles/abc123</span>
              </p>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowHelp(false)}
              className="arcade-gradient text-primary-foreground font-display"
            >
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="glass neon-border sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="font-display text-foreground">Atenção</DialogTitle>
            </div>
            <DialogDescription className="font-body text-muted-foreground pt-2 whitespace-pre-line">
              {modalMessage}
            </DialogDescription>
            <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border text-sm font-body text-muted-foreground space-y-1.5">
              <p className="text-foreground font-medium text-xs uppercase tracking-wide">Como encontrar sua URL:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Acesse <a href="https://www.cloudskillsboost.google" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">cloudskillsboost.google</a></li>
                <li>Clique na sua foto de perfil → <strong className="text-foreground">Perfil Público</strong></li>
                <li>Copie a URL da barra de endereço do navegador</li>
              </ol>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowModal(false)}
              className="arcade-gradient text-primary-foreground font-display"
            >
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileInput;
