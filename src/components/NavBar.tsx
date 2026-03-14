import { useState } from "react";
import { Home, Search, LogOut, Menu, X } from "lucide-react";
import logoArcade from "@/assets/logo-arcade.png";

interface NavBarProps {
  onReset: () => void;
  showResults?: boolean;
}

const NavBar = ({ onReset, showResults }: NavBarProps) => {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "Início", icon: Home, action: onReset, always: true },
    { label: "Nova Consulta", icon: Search, action: onReset, always: true },
    { label: "Sair", icon: LogOut, action: onReset, always: false },
  ];

  const visibleItems = items.filter((i) => i.always || showResults);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoArcade} alt="Logo" className="w-8 h-8" />
          <span className="font-display text-sm text-primary tracking-wider text-glow-yellow">ARCADE PROGRESS</span>
        </div>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {visibleItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { item.action(); setOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                item.label === "Sair"
                  ? "text-destructive hover:bg-destructive/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden mt-2 bg-card rounded-xl border border-border p-2 space-y-1 animate-scale-in shadow-lg">
          {visibleItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { item.action(); setOpen(false); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition-colors w-full text-left ${
                item.label === "Sair"
                  ? "text-destructive hover:bg-destructive/10"
                  : "text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon className={`w-4 h-4 ${item.label === "Sair" ? "" : "text-primary"}`} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
