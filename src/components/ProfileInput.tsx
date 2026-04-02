import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Zap, AlertTriangle, HelpCircle, History, Link2 } from "lucide-react";
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
    if (!credlyUrl.trim()) {
      setModalMessage("Por favor, insira a URL do seu perfil do Credly para validar os certificados de conclusão de trilha.");
      setShowModal(true);
      return;
    }
    if (!validateCredlyUrl(credlyUrl)) {
      setModalMessage("URL do Credly inválida. O link deve seguir o formato:\nhttps://www.credly.com/users/SEU_NOME/badges");
      setShowModal(true);
      return;
    }
    setError("");
    const trimmed = url.trim();
    saveToHistory(trimmed);
    setHistory(loadHistory());
    setShowHistory(false);
    onSubmit(trimmed, credlyUrl.trim() || undefined);
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-slide-up flex flex-col items-center">
      <div className="text-center mb-10 flex flex-col items-center">
        <img src={logoArcade} alt="Arcade Progress Logo" className="w-40 h-40 mb-6 animate-float drop-shadow-lg" />
        <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-3">
          ARCADE PROGRESS
        </h1>
        <p className="text-base font-display tracking-[0.3em] mb-1">
          <span className="text-primary">A</span>
          <span className="text-secondary">C</span>
          <span className="text-foreground">O</span>
          <span className="text-neon-green">M</span>
          <span className="text-foreground">P</span>
          <span className="text-primary">A</span>
          <span className="text-foreground">N</span>
          <span className="text-accent">H</span>
          <span className="text-foreground">E </span>
          <span className="text-foreground">S</span>
          <span className="text-foreground">U</span>
          <span className="text-secondary">A </span>
          <span className="text-foreground">J</span>
          <span className="text-primary">O</span>
          <span className="text-secondary">R</span>
          <span className="text-foreground">N</span>
          <span className="text-neon-green">A</span>
          <span className="text-foreground">D</span>
          <span className="text-primary">A</span>
        </p>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Google Arcade Facilitadores Brasil 2026
        </p>
        {/* Color divider bar */}
        <div className="flex mt-4 gap-0.5">
          <div className="w-12 h-1 rounded-full bg-primary" />
          <div className="w-12 h-1 rounded-full bg-secondary" />
          <div className="w-12 h-1 rounded-full bg-accent" />
          <div className="w-12 h-1 rounded-full bg-neon-green" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3 font-body">
              <Link2 className="w-4 h-4" />
              URL do Perfil Público (Google Skills) <span className="text-xs text-secondary">*obrigatório</span>
            </label>
            <div ref={inputWrapperRef} className="relative">
              <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-primary via-accent to-secondary">
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  onFocus={() => history.length > 0 && setShowHistory(true)}
                  placeholder="https://www.skills.google/public_profiles/..."
                  className="bg-card border-0 text-foreground placeholder:text-muted-foreground/50 h-12 text-base font-body rounded-[10px]"
                />
              </div>
              {showHistory && history.length > 0 && (
                <ul className="absolute z-50 left-0 right-0 top-full mt-1 rounded-xl border border-border bg-card shadow-lg overflow-hidden">
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

          <div className="border-t border-border pt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1 font-body">
              <Award className="w-4 h-4" />
              URL do Perfil Credly <span className="text-xs text-secondary">*obrigatório</span>
            </label>
            <p className="text-xs text-muted-foreground/70 mb-3 font-body">
              Necessário para validar certificados de conclusão de trilha.
            </p>
            <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-accent via-neon-green to-primary">
              <Input
                type="url"
                value={credlyUrl}
                onChange={(e) => setCredlyUrl(e.target.value)}
                placeholder="https://www.credly.com/users/seu-nome/badges"
                className="bg-card border-0 text-foreground placeholder:text-muted-foreground/50 h-12 text-base font-body rounded-[10px]"
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-lg font-semibold font-display arcade-gradient text-primary-foreground border-0 rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50"
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
        className="mx-auto mt-5 flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-sm font-body text-primary hover:bg-muted/50 transition-colors shadow-sm"
      >
        <HelpCircle className="w-4 h-4" />
        Como encontrar minha URL?
      </button>

      {/* Help Modal */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="bg-card border-border sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <DialogTitle className="font-display text-foreground">Como encontrar sua URL</DialogTitle>
            </div>
            <DialogDescription className="font-body text-muted-foreground pt-2">
              Siga os passos abaixo para copiar o link do seu perfil público:
            </DialogDescription>
            <div className="mt-3 p-4 rounded-xl bg-muted/50 border border-border text-sm font-body text-muted-foreground space-y-2">
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
            <Button onClick={() => setShowHelp(false)} className="arcade-gradient text-primary-foreground font-display rounded-xl">
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-card border-border sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10">
                <AlertTriangle className="w-5 h-5 text-secondary" />
              </div>
              <DialogTitle className="font-display text-foreground">Atenção</DialogTitle>
            </div>
            <DialogDescription className="font-body text-muted-foreground pt-2 whitespace-pre-line">
              {modalMessage}
            </DialogDescription>
            <div className="mt-3 p-3 rounded-xl bg-muted/50 border border-border text-sm font-body text-muted-foreground space-y-1.5">
              <p className="text-foreground font-medium text-xs uppercase tracking-wide">Como encontrar sua URL:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Acesse <a href="https://www.cloudskillsboost.google" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">cloudskillsboost.google</a></li>
                <li>Clique na sua foto de perfil → <strong className="text-foreground">Perfil Público</strong></li>
                <li>Copie a URL da barra de endereço do navegador</li>
              </ol>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)} className="arcade-gradient text-primary-foreground font-display rounded-xl">
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileInput;
