import { MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  VLAANDEREN_D,
  WALLONIE_D,
  BRUSSEL_D,
  BE_VIEWBOX,
  BE_PARENT_TRANSFORM,
  VLAANDEREN_TRANSFORM,
} from "./belgium-paths";

type Region = "vlaanderen" | "wallonie" | "brussel";

interface BelgiumMapProps {
  active: Region;
  label: string;
  sublabel?: string;
}

// Accurate vector paths sourced from Wikimedia Commons (CC BY-SA, Ssolbergj 2008).
// All three regions live inside a single <g> with the parent translate; only
// VLAANDEREN gets a counter-transform so its coordinates land in the same frame.
const PATHS: Record<Region, { d: string; transform?: string }> = {
  vlaanderen: { d: VLAANDEREN_D, transform: VLAANDEREN_TRANSFORM },
  wallonie: { d: WALLONIE_D },
  brussel: { d: BRUSSEL_D },
};

// Label anchor points in the un-translated viewBox (0..307 x 0..251).
const LABELS: Record<Region, { x: number; y: number; text: string; size: number }> = {
  vlaanderen: { x: 145, y: 70, text: "VLAANDEREN", size: 11 },
  wallonie: { x: 165, y: 175, text: "WALLONIË", size: 11 },
  brussel: { x: 220, y: 100, text: "BRUSSEL", size: 7.5 },
};

const ROUTES: Record<Region, string> = {
  vlaanderen: "/regio/vlaanderen",
  wallonie: "/regio/wallonie",
  brussel: "/regio/brussel",
};

const LABEL_TEXT: Record<Region, string> = {
  vlaanderen: "Vlaanderen",
  wallonie: "Wallonië",
  brussel: "Brussel",
};

const BelgiumMap = ({ active, label, sublabel }: BelgiumMapProps) => {
  const order: Region[] = ["vlaanderen", "wallonie", "brussel"];
  const navigate = useNavigate();

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

        <div className="w-full max-w-[380px] shrink-0">
          <svg
            viewBox={BE_VIEWBOX}
            className="w-full h-auto"
            role="img"
            aria-label={`Kaart van België met ${label} gemarkeerd`}
          >
            <defs>
              <linearGradient id="activeFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
              </linearGradient>
              <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g transform={BE_PARENT_TRANSFORM}>
              {(["vlaanderen", "wallonie", "brussel"] as Region[]).map((r) => {
                const isActive = r === active;
                const p = PATHS[r];
                return (
                  <g
                    key={r}
                    role="link"
                    tabIndex={0}
                    aria-label={`Ga naar regio ${LABEL_TEXT[r]}`}
                    onClick={() => navigate(ROUTES[r])}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(ROUTES[r]);
                      }
                    }}
                    className="cursor-pointer outline-none focus-visible:[&>path]:stroke-[#38bdf8]"
                  >
                    <path
                      d={p.d}
                      transform={p.transform}
                      fill={isActive ? "url(#activeFill)" : "hsl(var(--muted-foreground) / 0.16)"}
                      stroke={isActive ? "#38bdf8" : "hsl(var(--muted-foreground) / 0.45)"}
                      strokeWidth={isActive ? 0.6 : 0.35}
                      strokeLinejoin="round"
                      filter={isActive ? "url(#activeGlow)" : undefined}
                      className="transition-all duration-300 hover:fill-[#bae6fd] hover:stroke-[#38bdf8]"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                );
              })}
            </g>

            {(["vlaanderen", "wallonie", "brussel"] as Region[]).map((r) => {
              const isActive = r === active;
              const l = LABELS[r];
              return (
                <text
                  key={`label-${r}`}
                  x={l.x}
                  y={l.y}
                  textAnchor="middle"
                  className="select-none pointer-events-none"
                  fontSize={l.size}
                  fontWeight={isActive ? 800 : 600}
                  letterSpacing="0.6"
                  fill={isActive ? "#0c4a6e" : "hsl(var(--muted-foreground))"}
                  opacity={isActive ? 1 : 0.75}
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
              <Link
                key={`chip-${r}`}
                to={ROUTES[r]}
                className={
                  r === active
                    ? "text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-[#38bdf8]/60 bg-[#7dd3fc]/15 text-[#0c4a6e] dark:text-[#bae6fd] font-semibold"
                    : "text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-border/50 text-muted-foreground hover:border-[#38bdf8]/50 hover:text-foreground transition-colors"
                }
              >
                {LABEL_TEXT[r]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BelgiumMap;