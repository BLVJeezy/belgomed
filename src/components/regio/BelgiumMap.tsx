import { MapPin } from "lucide-react";

type Region = "vlaanderen" | "wallonie" | "brussel";

interface BelgiumMapProps {
  active: Region;
  label: string;
  sublabel?: string;
}

// Recognizable outlines of the three Belgian regions, scaled to viewBox 0 0 500 360.
// Shapes approximate the real geography (Flanders north, Wallonia south, Brussels
// as a small enclave inside Flanders).
const PATHS: Record<Region, string> = {
  vlaanderen:
    "M30,118 L55,92 L95,78 L150,68 L210,58 L255,54 L305,60 L355,72 L395,92 L425,118 L440,148 L440,172 L405,176 L355,184 L305,186 L278,182 L268,170 L255,164 L240,168 L232,180 L210,184 L165,182 L120,176 L85,168 L58,158 L40,142 Z",
  brussel:
    "M248,160 L268,158 L274,168 L270,178 L256,180 L246,172 Z",
  wallonie:
    "M40,142 L58,158 L85,168 L120,176 L165,182 L210,184 L232,180 L240,168 L255,164 L268,170 L278,182 L305,186 L355,184 L405,176 L440,172 L452,200 L450,238 L438,278 L420,318 L388,320 L350,308 L300,300 L262,322 L215,300 L170,278 L130,252 L98,222 L72,192 L52,170 Z",
};

const LABELS: Record<Region, { x: number; y: number; text: string; size: number }> = {
  vlaanderen: { x: 230, y: 122, text: "VLAANDEREN", size: 13 },
  wallonie: { x: 270, y: 244, text: "WALLONIË", size: 13 },
  brussel: { x: 305, y: 168, text: "BRUSSEL", size: 9 },
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
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              </linearGradient>
              <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Vlaanderen + Wallonie first, Brussel last so it sits on top */}
            {(["vlaanderen", "wallonie", "brussel"] as Region[]).map((r) => {
              const isActive = r === active;
              return (
                <path
                  key={r}
                  d={PATHS[r]}
                  fill={isActive ? "url(#activeFill)" : "hsl(var(--muted-foreground) / 0.14)"}
                  stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.4)"}
                  strokeWidth={isActive ? 1.6 : 0.9}
                  strokeLinejoin="round"
                  filter={isActive ? "url(#activeGlow)" : undefined}
                  className="transition-all duration-500"
                />
              );
            })}

            {/* Leader line from Brussels label to enclave */}
            <line
              x1={278}
              y1={168}
              x2={285}
              y2={166}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
              strokeWidth={0.8}
            />

            {(["vlaanderen", "wallonie", "brussel"] as Region[]).map((r) => {
              const isActive = r === active;
              const l = LABELS[r];
              return (
                <text
                  key={`label-${r}`}
                  x={l.x}
                  y={l.y}
                  textAnchor="middle"
                  className="select-none"
                  fontSize={l.size}
                  fontWeight={isActive ? 800 : 600}
                  letterSpacing="1.2"
                  fill={isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"}
                >
                  {l.text}
                </text>
              );
            })}
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