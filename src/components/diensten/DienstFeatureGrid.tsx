import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface DienstFeatureGridProps {
  features: Feature[];
  eyebrow?: string;
}

const DienstFeatureGrid = ({ features, eyebrow }: DienstFeatureGridProps) => {
  return (
    <div className="my-6">
      {eyebrow && (
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
          {eyebrow}
        </span>
      )}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-xl border border-border/40 dark:border-white/10 bg-card/40 backdrop-blur-sm p-5 transition-all duration-500 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-20px_hsl(180_100%_40%/0.3)]"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground tracking-tight mb-1.5">
                  {f.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DienstFeatureGrid;