import { Facebook, Instagram, Linkedin, Send, MessageCircle } from "lucide-react";

interface SocialShareButtonsProps {
  shareText?: string;
  shareUrl?: string;
  compact?: boolean;
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialShareButtons = ({
  shareText = "Confira meu progresso no Google Arcade! 🎮🏆",
  shareUrl,
  compact = false,
}: SocialShareButtonsProps) => {
  const url = shareUrl || window.location.href;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  const socials = [
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: "hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5",
    },
    {
      name: "X",
      icon: XIcon,
      href: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: "hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5",
      isCustom: true,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: `https://www.instagram.com/`,
      color: "hover:text-[#E4405F] hover:border-[#E4405F]/30 hover:bg-[#E4405F]/5",
    },
    {
      name: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: "hover:text-[#26A5E4] hover:border-[#26A5E4]/30 hover:bg-[#26A5E4]/5",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: "hover:text-[#25D366] hover:border-[#25D366]/30 hover:bg-[#25D366]/5",
    },
  ];

  return (
    <div className={`flex flex-col items-center gap-2 ${compact ? "" : "mt-2"}`}>
      <span className="text-xs font-body text-muted-foreground">Compartilhe nas redes sociais</span>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Compartilhar no ${social.name}`}
              className={`flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 ${social.color}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialShareButtons;
