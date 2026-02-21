import { Thermometer, Activity, CheckCircle2, Wifi } from "lucide-react";

const ColdChainDashboard = () => {
  return (
    <section id="producten" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 fade-up">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            Live Monitoring
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            Cold-Chain <span className="gradient-accent-text">Dashboard</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto glass-card p-8 fade-up fade-up-delay-1">
          {/* Top status bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
              <span className="text-xs font-medium tracking-wider uppercase text-primary">
                System Online
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wifi className="w-3.5 h-3.5" />
              <span className="text-xs">Live Data Feed</span>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-5 text-center">
              <Thermometer className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">4.2°C</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                Temperatuur
              </div>
              <div className="mt-2 text-[10px] font-medium text-primary flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Stabiel
              </div>
            </div>

            <div className="glass-card p-5 text-center">
              <Activity className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">62%</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                Luchtvochtigheid
              </div>
              <div className="mt-2 text-[10px] font-medium text-primary flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Optimaal
              </div>
            </div>

            <div className="glass-card p-5 text-center">
              <CheckCircle2 className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">GDP</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                Compliance
              </div>
              <div className="mt-2 text-[10px] font-medium text-primary flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Conform
              </div>
            </div>

            <div className="glass-card p-5 text-center">
              <Activity className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">99.8%</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                Uptime
              </div>
              <div className="mt-2 text-[10px] font-medium text-primary flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Actief
              </div>
            </div>
          </div>

          {/* Bottom notice */}
          <div className="mt-6 pt-4 border-t border-border/30 text-center">
            <p className="text-[11px] text-muted-foreground">
              Real-time monitoring van alle opslagfaciliteiten — Laatste update: zojuist
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColdChainDashboard;
