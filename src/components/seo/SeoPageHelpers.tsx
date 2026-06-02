import { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";

export const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4">{children}</h1>
);

export const Lead = ({ children }: { children: ReactNode }) => (
  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{children}</p>
);

export const H2 = ({ children, id }: { children: ReactNode; id?: string }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-12 mb-4 border-l-2 border-primary pl-4">{children}</h2>
);

export const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-2">{children}</h3>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{children}</p>
);

export const Ul = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-2 my-4">
    {items.map((it, i) => (
      <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground">
        <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export const CTA = ({ href = "/#contact", children }: { href?: string; children: ReactNode }) => (
  <div className="mt-10 pt-6 border-t border-border/30">
    <a href={href} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(180_100%_40%/0.3)]">
      {children}
      <ArrowRight className="w-4 h-4" />
    </a>
  </div>
);

interface CardGridProps {
  cards: { title: string; description: string; href: string }[];
}

export const CardGrid = ({ cards }: CardGridProps) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
    {cards.map((c) => (
      <a key={c.href} href={c.href} className="group p-5 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:bg-card/60 transition-all">
        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-3 group-hover:gap-2 transition-all">
          Meer info <ArrowRight className="w-3 h-3" />
        </span>
      </a>
    ))}
  </div>
);

interface FaqProps {
  items: { q: string; a: string }[];
}

export const Faq = ({ items }: FaqProps) => (
  <div className="space-y-3 my-4">
    {items.map((it, i) => (
      <details key={i} className="group rounded-lg border border-border/40 bg-card/30 p-4 open:bg-card/60 transition-colors">
        <summary className="cursor-pointer list-none flex items-start justify-between gap-3 text-sm md:text-base font-semibold text-foreground">
          <span>{it.q}</span>
          <span className="text-primary text-xl leading-none mt-[-2px] group-open:rotate-45 transition-transform">+</span>
        </summary>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">{it.a}</p>
      </details>
    ))}
  </div>
);