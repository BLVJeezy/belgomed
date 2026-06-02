import { LucideIcon, ArrowUpRight } from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

interface DienstShowcaseProps {
  code: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  stats: Stat[];
  ctaHref?: string;
  ctaLabel?: string;
}

const DienstShowcase = ({
  code,
  icon: Icon,
  title,
  subtitle,
  description,
  stats,
  ctaHref = "/#contact",
  ctaLabel = "Offerte aanvragen",
}: DienstShowcaseProps) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/40 dark:border-white/10 bg-card/40 backdrop-blur-sm p-7 md:p-10 my-6 group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-70" />
      <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
            </div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border border-primary/30 text-primary bg-background/60 backdrop-blur-sm">
              {code}
            </span>
          </div>
          <a
            href={ctaHref}
            aria-label={ctaLabel}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-primary hover:gap-2.5 transition-all"
          >
            {ctaLabel}
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </a>
        </div>

        <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
          {subtitle}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
          {title}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>

        <div className="mt-8 pt-6 border-t border-border/30 dark:border-white/10 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                {s.value}
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DienstShowcase;