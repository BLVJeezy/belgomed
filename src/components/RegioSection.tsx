import { MapPin, ArrowUpRight } from "lucide-react";

const regions = [
  {
    code: "VL",
    name: "Vlaanderen",
    subtitle: "5 provincies — NL",
    href: "/regio/vlaanderen",
    provinces: ["Antwerpen", "Oost-Vlaanderen", "West-Vlaanderen", "Vlaams-Brabant", "Limburg"],
    accent: "from-primary/20 via-primary/5 to-transparent",
  },
  {
    code: "WA",
    name: "Wallonië",
    subtitle: "5 provinces — FR",
    href: "/regio/wallonie",
    provinces: ["Hainaut", "Liège", "Namur", "Luxembourg", "Brabant Wallon"],
    accent: "from-accent/30 via-accent/10 to-transparent",
  },
  {
    code: "BXL",
    name: "Brussel",
    subtitle: "Capitale — NL · FR",
    href: "/regio/brussel",
    provinces: ["19 gemeenten / communes"],
    accent: "from-primary/15 via-primary/5 to-transparent",
  },
];

const RegioSection = () => {
  return (
    <section id="regio" className="py-14 md:py-24 relative">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            Nationale Dekking
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            Wij leveren in
            <br />
            <span className="gradient-accent-text">heel België</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Van Limburg tot Luxembourg, van Antwerpen tot Bruxelles — Belgomed bedient apotheken en zorginstellingen in elke provincie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {regions.map((r) => (
            <a
              key={r.code}
              href={r.href}
              aria-label={`Medische groothandel ${r.name}`}
              className="group relative overflow-hidden rounded-2xl border border-border/40 dark:border-white/10 bg-card/40 backdrop-blur-sm p-7 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_hsl(180_100%_40%/0.3)] focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${r.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
                      <MapPin className="w-5 h-5 text-primary" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border border-primary/30 text-primary bg-background/60 backdrop-blur-sm">
                      {r.code}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all duration-500" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">
                  {r.name}
                </h3>
                <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-5">
                  {r.subtitle}
                </p>

                <div className="space-y-1.5 pt-5 border-t border-border/30 dark:border-white/10">
                  {r.provinces.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary/60" />
                      <span className="text-xs text-muted-foreground group-hover:text-foreground/90 transition-colors">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-primary group-hover:gap-2.5 transition-all">
                  Bekijk regio
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegioSection;