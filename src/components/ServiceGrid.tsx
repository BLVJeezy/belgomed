import { Pill, Heart, Stethoscope, Thermometer, Snowflake, TrendingDown, Shield, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import serviceRx from "@/assets/service-rx.jpg";
import serviceOtc from "@/assets/service-otc.jpg";
import serviceMed from "@/assets/service-med.jpg";
import { useLang } from "@/contexts/LangContext";

const serviceData = [
  { icon: Pill, tag: "RX", image: serviceRx, titleKey: "sg.rx.title", descKey: "sg.rx.desc" },
  { icon: Heart, tag: "OTC", image: serviceOtc, titleKey: "sg.otc.title", descKey: "sg.otc.desc" },
  { icon: Stethoscope, tag: "MED", image: serviceMed, titleKey: "sg.med.title", descKey: "sg.med.desc" },
];

const zones = [
  { name: "Magazijn A", temp: 4.2, target: "2–8°C", icon: Snowflake },
  { name: "Transport", temp: 5.1, target: "2–8°C", icon: Truck },
  { name: "Magazijn B", temp: 3.8, target: "2–8°C", icon: Snowflake },
  
];

const ColdChainTracker = () => {
  const [temps, setTemps] = useState(zones.map((z) => z.temp));
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemps(
        zones.map((z) => {
          const drift = (Math.random() - 0.5) * 0.4;
          return parseFloat((z.temp + drift).toFixed(1));
        })
      );
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full bg-emerald-500 ${pulse ? "animate-ping" : ""}`} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Live — Alle zones operationeel</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {zones.map((zone, i) => {
          const Icon = zone.icon;
          return (
            <div key={zone.name} className="relative rounded-lg border border-border/30 dark:border-white/10 bg-secondary/30 dark:bg-white/5 p-4 transition-all duration-300 hover:border-primary/30">
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-4 h-4 text-muted-foreground/60" strokeWidth={1.5} />
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] uppercase tracking-wider text-emerald-500 font-bold">OK</span>
                </div>
              </div>
              <p className={`text-2xl md:text-3xl font-bold text-primary tabular-nums transition-all duration-500 ${pulse ? "scale-105" : "scale-100"}`}>
                {temps[i]}°
              </p>
              <p className="text-[11px] font-semibold text-foreground/80 mt-1">{zone.name}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">Bereik: {zone.target}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-2 border-t border-border/20 dark:border-white/5">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] text-muted-foreground font-medium">GDP Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] text-muted-foreground font-medium">24/7 Monitoring</span>
        </div>
        <div className="flex items-center gap-2">
          <Snowflake className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] text-muted-foreground font-medium">99.8% Stabiliteit</span>
        </div>
      </div>
    </div>
  );
};

const ServiceGrid = () => {
  const { t } = useLang();

  return (
    <section id="diensten" className="py-14 md:py-24 relative">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-16 fade-up">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            {t("sg.tag")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            {t("sg.title1")}
            <br />
            <span className="gradient-accent-text">{t("sg.title2")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceData.map((service, i) => (
            <div key={service.tag} className={`glass-card-hover overflow-hidden group fade-up fade-up-delay-${i + 1}`}>
              <div className="relative h-48 overflow-hidden">
                <img src={service.image} alt={t(service.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute top-3 right-3 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-background/60 backdrop-blur-sm">
                  {service.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">{t(service.titleKey)}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(service.descKey)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Cold Chain */}
        <div className="mt-10 glass-card-hover overflow-hidden group fade-up rounded-xl">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-500">
                <Thermometer className="w-7 h-7 text-primary" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-background/60 backdrop-blur-sm">COLD CHAIN</span>
                <h3 className="text-xl font-bold tracking-tight text-foreground mt-3">Live Cold Chain Monitoring</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-2xl">
                  Real-time temperatuurmonitoring voor de volledige supply chain. Onze geavanceerde cold chain technologie garandeert de integriteit van temperatuurgevoelige producten van magazijn tot levering.
                </p>
              </div>
            </div>

            <ColdChainTracker />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
