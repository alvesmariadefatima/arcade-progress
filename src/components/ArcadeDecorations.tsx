import { Plus } from "lucide-react";

const ArcadeDecorations = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Crosses */}
      <Plus className="absolute top-[12%] left-[8%] w-5 h-5 text-primary/30 animate-pulse-glow" />
      <Plus className="absolute top-[25%] right-[10%] w-4 h-4 text-secondary/25 animate-pulse-glow" style={{ animationDelay: "0.4s" }} />
      <Plus className="absolute bottom-[30%] left-[5%] w-6 h-6 text-accent/20 animate-pulse-glow" style={{ animationDelay: "0.8s" }} />
      <Plus className="absolute top-[60%] right-[7%] w-5 h-5 text-neon-green/20 animate-pulse-glow" style={{ animationDelay: "1.2s" }} />
      <Plus className="absolute bottom-[15%] right-[15%] w-4 h-4 text-primary/20 animate-pulse-glow" style={{ animationDelay: "1.6s" }} />
      <Plus className="absolute top-[45%] left-[12%] w-3 h-3 text-secondary/20 animate-pulse-glow" style={{ animationDelay: "0.6s" }} />

      {/* Colored dots */}
      <div className="absolute top-[18%] right-[20%] w-2 h-2 rounded-full bg-primary/40 animate-pulse-glow" />
      <div className="absolute top-[35%] left-[15%] w-2.5 h-2.5 rounded-full bg-secondary/35 animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-[25%] right-[22%] w-2 h-2 rounded-full bg-accent/35 animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[70%] left-[20%] w-1.5 h-1.5 rounded-full bg-neon-green/30 animate-pulse-glow" style={{ animationDelay: "1.4s" }} />
      <div className="absolute bottom-[40%] left-[25%] w-2 h-2 rounded-full bg-primary/25 animate-pulse-glow" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[50%] right-[30%] w-1.5 h-1.5 rounded-full bg-secondary/25 animate-pulse-glow" style={{ animationDelay: "0.9s" }} />
      <div className="absolute bottom-[10%] left-[35%] w-2 h-2 rounded-full bg-accent/30 animate-pulse-glow" style={{ animationDelay: "1.8s" }} />

      {/* Small diamond shapes */}
      <div className="absolute top-[15%] left-[40%] w-2 h-2 bg-primary/20 rotate-45 animate-pulse-glow" style={{ animationDelay: "0.7s" }} />
      <div className="absolute bottom-[35%] right-[12%] w-2.5 h-2.5 bg-secondary/15 rotate-45 animate-pulse-glow" style={{ animationDelay: "1.1s" }} />
      <div className="absolute top-[80%] right-[35%] w-2 h-2 bg-accent/20 rotate-45 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
    </div>
  );
};

export default ArcadeDecorations;
