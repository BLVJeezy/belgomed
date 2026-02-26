import { useLang } from "@/contexts/LangContext";
import { ClipboardList, Search, Truck, ShieldCheck, HeartPulse } from "lucide-react";

const steps = [
  { key: "1", icon: ClipboardList },
  { key: "2", icon: Search },
  { key: "3", icon: ShieldCheck },
  { key: "4", icon: Truck },
  { key: "5", icon: HeartPulse },
];

const ProcessSection = () => {
  const { t } = useLang();

  return (
    <section id="process" className="py-14 md:py-20 px-5 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            {t("process.tag")}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
            {t("process.title")}
          </h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/80 via-primary/40 to-primary/10" />

          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;

              return (
                <div key={step.key} className="relative flex items-start gap-5 md:gap-7">
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>

                  {/* Content card */}
                  <div className={`glass-card px-5 py-4 md:px-6 md:py-5 flex-1 ${isLast ? "mb-0" : "mb-6 md:mb-8"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-primary/70">
                        {t("process.step")} {step.key}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
                      {t(`process.${step.key}.title`)}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {t(`process.${step.key}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
