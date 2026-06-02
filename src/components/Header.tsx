import { useState, useRef, useEffect } from "react";
import { Search, Menu, X, ChevronDown, Globe } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoHeader from "@/assets/logo-header.png";
import ThemeToggle from "@/components/ThemeToggle";
import { useLang } from "@/contexts/LangContext";

const languages = [
{ code: "NL" as const, label: "Nederlands" },
{ code: "DE" as const, label: "Deutsch" },
{ code: "FR" as const, label: "Français" },
{ code: "EN" as const, label: "English" }];


const Header = () => {
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [dienstenOpen, setDienstenOpen] = useState(false);
  const [regioOpen, setRegioOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const dienstenRef = useRef<HTMLDivElement>(null);
  const regioRef = useRef<HTMLDivElement>(null);

  const navItems = [
  { label: t("nav.about"), href: "/#overons" },
  { label: t("nav.process"), href: "/#process" },
  { label: t("nav.contact"), href: "/#contact" }];

  const dienstenItems = [
    { label: "RX Medicijnen", href: "/diensten/rx-medicijnen" },
    { label: "OTC Producten", href: "/diensten/otc-producten" },
    { label: "Medische Hulpmiddelen", href: "/diensten/medische-hulpmiddelen" },
  ];
  const regioItems = [
    { label: "Vlaanderen", href: "/regio/vlaanderen" },
    { label: "Wallonië", href: "/regio/wallonie" },
    { label: "Brussel", href: "/regio/brussel" },
  ];

  // Smart navigation for hash links like "/#overons" — if we're already on the
  // home page, smooth-scroll to the section; otherwise navigate home and scroll
  // once the target is mounted.
  const handleHashNav = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const id = href.slice(2);
    const scrollTo = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname === "/") {
      scrollTo();
    } else {
      navigate("/");
      // wait for home to mount
      setTimeout(scrollTo, 80);
    }
    setMobileOpen(false);
  };


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (dienstenRef.current && !dienstenRef.current.contains(e.target as Node)) {
        setDienstenOpen(false);
      }
      if (regioRef.current && !regioRef.current.contains(e.target as Node)) {
        setRegioOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" role="banner">
      <nav className="border-b border-border/30 bg-background/60 backdrop-blur-xl" aria-label="Hoofdnavigatie">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" aria-label="Belgomed — terug naar home" className="flex items-center">
            <img src={logoHeader} alt="Belgomed" className="h-9 w-auto dark:invert dark:hue-rotate-180" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
            <a
              key={item.label}
              href={item.href}
              onClick={handleHashNav(item.href)}
              className="text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors duration-300">

                {item.label}
              </a>
            )}

            <div className="relative" ref={dienstenRef}>
              <button
                onClick={() => { setDienstenOpen(!dienstenOpen); setRegioOpen(false); }}
                className="flex items-center gap-1 text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors duration-300">
                Diensten
                <ChevronDown className={`w-3 h-3 transition-transform ${dienstenOpen ? "rotate-180" : ""}`} />
              </button>
              {dienstenOpen && (
                <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[220px] z-50">
                  {dienstenItems.map((d) => (
                    <a key={d.href} href={d.href} onClick={() => setDienstenOpen(false)} className="block px-3 py-2 text-xs tracking-wide text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors">
                      {d.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={regioRef}>
              <button
                onClick={() => { setRegioOpen(!regioOpen); setDienstenOpen(false); }}
                className="flex items-center gap-1 text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors duration-300">
                Regio's
                <ChevronDown className={`w-3 h-3 transition-transform ${regioOpen ? "rotate-180" : ""}`} />
              </button>
              {regioOpen && (
                <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[180px] z-50">
                  {regioItems.map((d) => (
                    <a key={d.href} href={d.href} onClick={() => setRegioOpen(false)} className="block px-3 py-2 text-xs tracking-wide text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors">
                      {d.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/admin"
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-sm">

              Belgomed Hub
            </a>

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors duration-300">

                <Globe className="w-4 h-4" />
                {lang}
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen &&
              <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[150px] z-50">
                  {languages.map((l) =>
                <button
                  key={l.code}
                  onClick={() => {setLang(l.code);setLangOpen(false);}}
                  className={`w-full text-left px-3 py-2 text-xs tracking-wide transition-colors ${
                  lang === l.code ?
                  "text-primary font-semibold bg-primary/10" :
                  "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`
                  }>

                      {l.code} — {l.label}
                    </button>
                )}
                </div>
              }
            </div>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors">

              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors">

              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {searchOpen &&
        <div className="border-t border-border/30 px-6 py-3 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto">
              <input
              type="text"
              placeholder={t("nav.search")}
              className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              autoFocus />

            </div>
          </div>
        }

        {mobileOpen &&
        <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
            {navItems.map((item) =>
          <a
            key={item.label}
            href={item.href}
            onClick={handleHashNav(item.href)}
            className="block text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-primary transition-colors">

                {item.label}
              </a>
          )}
            <div className="pt-2 border-t border-border/30">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-2">Diensten</p>
              {dienstenItems.map((d) => (
                <a key={d.href} href={d.href} onClick={() => setMobileOpen(false)} className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  {d.label}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-border/30">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-2">Regio's</p>
              {regioItems.map((d) => (
                <a key={d.href} href={d.href} onClick={() => setMobileOpen(false)} className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  {d.label}
                </a>
              ))}
            </div>
            <a
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="inline-block mt-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded-sm text-center w-full hover:bg-primary/90 transition-colors">

              Belgomed HUB 
            </a>
          </div>
        }
      </nav>
    </header>);

};

export default Header;