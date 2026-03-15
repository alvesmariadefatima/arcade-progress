const ArcadeDecorations = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-right blue blob */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/8 blur-[60px]" />

      {/* Top-left blue curve */}
      <div className="absolute top-0 right-0 w-64 h-48">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-[100px] bg-primary/10" />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-bl-[80px] bg-primary/5" />
      </div>

      {/* Bottom-left red triangle accent */}
      <div className="absolute bottom-20 left-0 w-0 h-0 border-l-[60px] border-l-secondary/15 border-t-[40px] border-t-transparent border-b-[40px] border-b-transparent" />

      {/* Bottom-right colorful curve */}
      <div className="absolute -bottom-10 -right-10 w-72 h-48">
        <div className="absolute bottom-0 right-0 w-56 h-32 rounded-tl-[80px] bg-accent/10" />
        <div className="absolute bottom-8 right-8 w-40 h-24 rounded-tl-[60px] bg-neon-green/8" />
      </div>

      {/* Colored dots — blue pattern top-left */}
      <div className="absolute top-[20%] left-[6%] grid grid-cols-5 gap-1.5 opacity-40">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={`bl-${i}`} className="w-1.5 h-1.5 rounded-full bg-primary" />
        ))}
      </div>

      {/* Colored dots — orange pattern bottom-left */}
      <div className="absolute bottom-[15%] left-[8%] grid grid-cols-4 gap-1.5 opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`or-${i}`} className="w-1.5 h-1.5 rounded-full bg-accent" />
        ))}
      </div>

      {/* Small colored squares */}
      <div className="absolute top-[15%] left-[30%] w-3 h-3 bg-neon-green/30 rotate-45" />
      <div className="absolute top-[12%] right-[25%] w-2 h-2 bg-secondary/25 rotate-12" />
      <div className="absolute bottom-[30%] right-[8%] w-2.5 h-2.5 bg-primary/20 rotate-45" />
      <div className="absolute top-[50%] left-[4%] w-2 h-2 bg-accent/25" />

      {/* Plus signs */}
      <div className="absolute top-[25%] left-[15%] text-primary/20 text-xl font-bold">+</div>
      <div className="absolute top-[40%] right-[12%] text-secondary/15 text-lg font-bold">+</div>
      <div className="absolute bottom-[35%] left-[20%] text-neon-green/20 text-base font-bold">+</div>

      {/* Sparkle stars */}
      <div className="absolute top-[18%] right-[18%] text-accent/50 text-lg">✦</div>
      <div className="absolute top-[8%] right-[35%] text-accent/30 text-sm">✦</div>
      <div className="absolute bottom-[25%] left-[45%] text-primary/20 text-xs">✦</div>

      {/* Horizontal color line accents */}
      <div className="absolute top-[30%] left-0 w-16 h-0.5 bg-secondary/20" />
      <div className="absolute top-[65%] right-0 w-20 h-0.5 bg-primary/15" />

      {/* Bottom rainbow bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rainbow-bar" />
    </div>
  );
};

export default ArcadeDecorations;
