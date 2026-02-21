import { useState, useRef, useEffect } from "react";
import { Search, Menu, X, ChevronDown, Globe } from "lucide-react";
import logoB from "@/assets/logo-b.png";

const languages = [
  { code: "NL", label: "Nederlands" },
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
  { code: "EN", label: "English" },
];

const navItems = [
{ label: "Onze Diensten", href: "#diensten" },
{ label: "Licenties", href: "#licenties" },
{ label: "Producten", href: "#producten" },
{ label: "Contact", href: "#contact" }];


const Header = () => {
  const [activeLang, setActiveLang] = useState("NL");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav */}
      <nav className="border-b border-border/30 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <img src={logoB} alt="Belgomed" className="h-9 w-auto" />
            <span className="text-xl font-bold tracking-wider text-foreground">BELGOMED</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors duration-300">
                {item.label}
              </a>
            )}

            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Globe className="w-4 h-4" />
                {activeLang}
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[150px] z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setActiveLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs tracking-wide transition-colors ${
                        activeLang === l.code
                          ? "text-primary font-semibold bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {l.code} — {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen &&
        <div className="border-t border-border/30 px-6 py-3 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto">
              <input
              type="text"
              placeholder="Zoek producten, medicijnen, hulpmiddelen..."
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              autoFocus />

            </div>
          </div>
        }

        {/* Mobile nav */}
        {mobileOpen &&
        <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
            {navItems.map((item) =>
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors">

                {item.label}
              </a>
          )}
          </div>
        }
      </nav>
    </header>);

};

export default Header;