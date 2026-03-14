import { Plus } from "lucide-react";

const ArcadeDecorations = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Pixel crosses — logo blue, red, yellow, green */}
      <Plus className="absolute top-[12%] left-[8%] w-5 h-5 text-primary/30 animate-pulse-glow" />
      <Plus className="absolute top-[25%] right-[10%] w-4 h-4 text-secondary/25 animate-pulse-glow" style={{ animationDelay: "0.4s" }} />
      <Plus className="absolute bottom-[30%] left-[5%] w-6 h-6 text-accent/20 animate-pulse-glow" style={{ animationDelay: "0.8s" }} />
      <Plus className="absolute top-[60%] right-[7%] w-5 h-5 text-neon-green/25 animate-pulse-glow" style={{ animationDelay: "1.2s" }} />
      <Plus className="absolute bottom-[15%] right-[15%] w-4 h-4 text-primary/20 animate-pulse-glow" style={{ animationDelay: "1.6s" }} />
      <Plus className="absolute top-[45%] left-[12%] w-3 h-3 text-secondary/20 animate-pulse-glow" style={{ animationDelay: "0.6s" }} />

      {/* Colored dots — matching logo colors */}
      <div className="absolute top-[18%] right-[20%] w-2 h-2 rounded-full bg-primary/40 animate-pulse-glow" />
      <div className="absolute top-[35%] left-[15%] w-2.5 h-2.5 rounded-full bg-secondary/35 animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-[25%] right-[22%] w-2 h-2 rounded-full bg-accent/35 animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[70%] left-[20%] w-1.5 h-1.5 rounded-full bg-neon-green/30 animate-pulse-glow" style={{ animationDelay: "1.4s" }} />
      <div className="absolute bottom-[40%] left-[25%] w-2 h-2 rounded-full bg-primary/25 animate-pulse-glow" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[50%] right-[30%] w-1.5 h-1.5 rounded-full bg-neon-pink/25 animate-pulse-glow" style={{ animationDelay: "0.9s" }} />
      <div className="absolute bottom-[10%] left-[35%] w-2 h-2 rounded-full bg-accent/30 animate-pulse-glow" style={{ animationDelay: "1.8s" }} />

      {/* Pixel squares — arcade style */}
      <div className="absolute top-[15%] left-[40%] w-2 h-2 bg-primary/15 rotate-45 animate-pulse-glow" style={{ animationDelay: "0.7s" }} />
      <div className="absolute bottom-[35%] right-[12%] w-2.5 h-2.5 bg-secondary/12 rotate-45 animate-pulse-glow" style={{ animationDelay: "1.1s" }} />
      <div className="absolute top-[80%] right-[35%] w-2 h-2 bg-accent/18 rotate-45 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Neon line accents — horizontal */}
      <div className="absolute top-[22%] left-0 w-24 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-[55%] right-0 w-32 h-px bg-gradient-to-l from-transparent via-secondary/15 to-transparent" />
      <div className="absolute bottom-[20%] left-0 w-20 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

      {/* Corner geometric shapes — arcade cabinet inspired */}
      <div className="absolute top-4 left-4 w-8 h-8 border border-primary/10 rounded-sm rotate-12" />
      <div className="absolute bottom-8 right-6 w-6 h-6 border border-accent/10 rounded-sm -rotate-12" />

      {/* Floating pixel particles */}
      <div className="absolute top-[40%] left-[3%] w-1 h-1 bg-neon-cyan/40 animate-float" style={{ animationDelay: "0.2s" }} />
      <div className="absolute top-[65%] right-[5%] w-1 h-1 bg-accent/40 animate-float" style={{ animationDelay: "0.8s" }} />
      <div className="absolute top-[30%] left-[50%] w-1 h-1 bg-neon-green/35 animate-float" style={{ animationDelay: "1.3s" }} />
      <div className="absolute bottom-[45%] right-[40%] w-1 h-1 bg-primary/35 animate-float" style={{ animationDelay: "0.5s" }} />
    </div>
  );
};

export default ArcadeDecorations;
