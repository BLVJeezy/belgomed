import { ShieldCheck, Award, FileCheck } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "FAGG Gereguleerd",
    desc: "Federaal Agentschap voor Geneesmiddelen",
  },
  {
    icon: Award,
    title: "GDP Gecertificeerd",
    desc: "Good Distribution Practice",
  },
  {
    icon: FileCheck,
    title: "WDA Vergunning",
    desc: "Wholesale Distribution Authorisation",
  },
];

const ComplianceBar = () => {
  return (
    <section id="licenties" className="py-10 md:py-16 relative">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badges.map((badge, i) => (
            <div
              key={badge.title}
              className={`glass-card p-6 flex items-center gap-4 fade-up fade-up-delay-${i + 1}`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-wide uppercase text-foreground">
                  {badge.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {badge.desc}
                </p>
              </div>
              <div className="ml-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-primary pulse-glow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceBar;
