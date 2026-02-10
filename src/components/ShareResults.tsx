import { useState } from "react";
import { Share2, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { ArcadeProfile } from "@/lib/arcade-types";
import { useToast } from "@/components/ui/use-toast";

interface ShareResultsProps {
  profile: ArcadeProfile;
}

const ShareResults = ({ profile }: ShareResultsProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareText = `🎮 Meu progresso no Google Arcade 2026!\n\n👤 ${profile.name}\n🏆 ${profile.league || profile.level}\n⭐ ${profile.points.toLocaleString()} pontos\n🎖️ ${profile.badges.length} badges conquistados\n\n#GoogleArcade2026 #GoogleCloud`;

  const encodedText = encodeURIComponent(shareText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast({ title: "Copiado!", description: "Texto copiado para a área de transferência." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Erro", description: "Não foi possível copiar.", variant: "destructive" });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Google Arcade 2026", text: shareText });
      } catch {
        // user cancelled, ignore
      }
    } else {
      setOpen(!open);
    }
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const socials = [
    {
      name: "X (Twitter)",
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://cloud.google.com/arcade")}&summary=${encodedText}`,
    },
    {
      name: "WhatsApp",
      icon: <span className="text-sm">💬</span>,
      url: `https://wa.me/?text=${encodedText}`,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 rounded-xl glass neon-border text-sm font-body text-muted-foreground hover:text-foreground hover:glow-cyan transition-all duration-300"
      >
        <Share2 className="w-4 h-4" />
        Compartilhar
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 w-56 rounded-xl bg-card border border-border shadow-lg p-2 space-y-1 animate-scale-in">
            {socials.map((s) => (
              <button
                key={s.name}
                onClick={() => openLink(s.url)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-card-foreground hover:bg-muted transition-colors w-full text-left"
              >
                {s.icon}
                {s.name}
              </button>
            ))}
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-card-foreground hover:bg-muted transition-colors w-full text-left"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar texto"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareResults;
