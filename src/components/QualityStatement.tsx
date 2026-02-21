import { Thermometer, ShieldCheck, Truck, ClipboardCheck } from "lucide-react";

const points = [
  {
    icon: Thermometer,
    title: "Temperatuurmonitoring",
    desc: "Constante real-time monitoring van opslagcondities",
  },
  {
    icon: ShieldCheck,
    title: "Hygiënestandaarden",
    desc: "Hoogste normen voor opslag en handling",
  },
  {
    icon: Truck,
    title: "Efficiënt Ordersysteem",
    desc: "Gestroomlijnd bestel- en leveringsproces",
  },
  {
    icon: ClipboardCheck,
    title: "FAGG Conformiteit",
    desc: "Volledige naleving van alle regelgeving",
  },
];

const QualityStatement = () => {
  return (
    <section className="py-14 md:py-24 relative">
      <div className="container mx-auto px-5 md:px-6">
        <div className="glass-card p-6 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
                Kwaliteitsgarantie
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 tracking-tight">
                GDP Standaarden
                <br />
                <span className="gradient-accent-text">Zonder Compromis</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Constante temperatuurmonitoring, hoogste hygiënestandaarden, en
                een efficiënt ordersysteem conform FAGG eisen. Elke schakel in
                onze distributieketen is ontworpen voor maximale veiligheid en
                traceerbaarheid.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {points.map((point, i) => (
                <div
                  key={point.title}
                  className={`glass-card p-4 md:p-5 fade-up fade-up-delay-${i + 1}`}
                >
                  <point.icon className="w-5 h-5 text-primary mb-2 md:mb-3" />
                  <h4 className="text-xs md:text-sm font-semibold mb-1 text-foreground leading-tight">
                    {point.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-muted-foreground leading-snug">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityStatement;
