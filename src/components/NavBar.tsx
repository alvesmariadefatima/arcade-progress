import { useState } from "react";
import { Home, Search, Trophy, Menu, X } from "lucide-react";

interface NavBarProps {
  onReset: () => void;
  showResults?: boolean;
}

const NavBar = ({ onReset, showResults }: NavBarProps) => {
  const [open, setOpen] = useState(false);

  const items = [
    { label: "Início", icon: Home, action: onReset },
    { label: "Nova Consulta", icon: Search, action: onReset },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <span className="font-display text-sm text-primary tracking-wider">Arcade Tracker</span>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => { item.action(); setOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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
        <div className="sm:hidden mt-2 glass rounded-xl neon-border p-2 space-y-1 animate-scale-in">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => { item.action(); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body text-foreground hover:bg-muted/50 transition-colors w-full text-left"
            >
              <item.icon className="w-4 h-4 text-primary" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
