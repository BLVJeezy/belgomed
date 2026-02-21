import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const languages = ["NL", "FR", "EN"];

const navItems = [
{ label: "Onze Diensten", href: "#diensten" },
{ label: "Licenties", href: "#licenties" },
{ label: "Producten", href: "#producten" },
{ label: "Contact", href: "#contact" }];


const Header = () => {
  const [activeLang, setActiveLang] = useState("NL");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-2 text-xs tracking-widest uppercase">
          
          <div className="flex gap-2">
            {languages.map((l) =>
            <button
              key={l}
              onClick={() => setActiveLang(l)}
              className={`px-2 py-0.5 rounded transition-colors ${
              activeLang === l ?
              "text-primary font-semibold" :
              "text-muted-foreground hover:text-foreground"}`
              }>

                {l}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-b border-border/30 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold tracking-wider">
            <span className="gradient-accent-text">BELGOMED</span>
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