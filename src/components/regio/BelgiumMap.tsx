import { MapPin } from "lucide-react";

type Region = "vlaanderen" | "wallonie" | "brussel";

interface BelgiumMapProps {
  active: Region;
  label: string;
  sublabel?: string;
}

// Stylized, approximate polygon outlines of the three Belgian regions.
// Designed for clarity over cartographic accuracy.
const PATHS: Record<Region, string> = {
  vlaanderen:
    "M55,110 L130,70 L220,55 L320,58 L405,80 L440,130 L395,165 L320,170 L255,165 L235,150 L215,155 L200,170 L160,180 L110,175 L70,150 Z",
  brussel:
    "M205,158 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0",
  wallonie:
    "M70,150 L110,175 L160,180 L200,170 L215,155 L235,150 L255,165 L320,170 L395,165 L440,130 L455,185 L430,245 L370,295 L300,310 L230,300 L170,285 L110,250 L70,210 Z",
};

const LABELS: Record<Region, { x: number; y: number; text: string }> = {
  vlaanderen: { x: 245, y: 120, text: "Vlaanderen" },
  wallonie: { x: 260, y: 240, text: "Wallonië" },
  brussel: { x: 205, y: 158, text: "BXL" },
};

const BelgiumMap = ({ active, label, sublabel }: BelgiumMapProps) => {
  const order: Region[] = ["vlaanderen", "wallonie", "brussel"];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/40 dark:border-white/10 bg-card/40 backdrop-blur-sm p-6 md:p-8 my-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="flex items-center gap-2 md:hidden">
          <MapPin className="w-4 h-4 text-primary" strokeWidth={1.75} />
          <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-semibold">
            Geografische dekking
          </span>
        </div>

        <div className="w-full max-w-[360px] shrink-0">
          <svg
            viewBox="0 0 500 350"
            className="w-full h-auto"
            role="img"
            aria-label={`Kaart van België met ${label} gemarkeerd`}
          >
            <defs>
              <linearGradient id="activeFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
              </linearGradient>
              <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {order.map((r) => {
              const isActive = r === active;
              return (
                <path
                  key={r}
                  d={PATHS[r]}
                  fill={isActive ? "url(#activeFill)" : "hsl(var(--muted-foreground) / 0.12)"}
                  stroke={
                    isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground) / 0.35)"
                  }
                  strokeWidth={isActive ? 1.5 : 0.8}
                  filter={isActive ? "url(#activeGlow)" : undefined}
                  className="transition-all duration-500"
                />
              );
            })}

            {order.map((r) => {
              const isActive = r === active;
              const l = LABELS[r];
              return (
                <text
                  key={`label-${r}`}
                  x={l.x}
                  y={l.y}
                  textAnchor="middle"
                  className="select-none"
                  fontSize={r === "brussel" ? 9 : 13}
                  fontWeight={isActive ? 700 : 500}
                  letterSpacing="1"
                  fill={
                    isActive
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--muted-foreground))"
                  }
                  style={{ textTransform: "uppercase" }}
                >
                  {l.text}
                </text>
              );
            })}

            {active !== "brussel" && (
              <circle
                cx={205}
                cy={158}
                r={4}
                fill="hsl(var(--background))"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
              />
            )}
          </svg>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="hidden md:flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" strokeWidth={1.75} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-semibold">
              Geografische dekking
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {label}
          </h2>
          {sublabel && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
              {sublabel}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
            {order.map((r) => (
              <span
                key={`chip-${r}`}
                className={
                  r === active
                    ? "text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-primary/50 bg-primary/15 text-primary font-semibold"
                    : "text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground"
                }
              >
                {r === "vlaanderen" ? "Vlaanderen" : r === "wallonie" ? "Wallonië" : "Brussel"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BelgiumMap;