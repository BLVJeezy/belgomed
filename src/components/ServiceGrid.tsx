import { Pill, Heart, Stethoscope } from "lucide-react";

const services = [
  {
    icon: Pill,
    title: "Medicijnen op Voorschrift",
    tag: "RX",
    desc: "Veilige en hoogwaardige distributie van voorschriftgeneesmiddelen. Gegarandeerde traceerbaarheid en cold-chain compliance voor alle farmaceutische producten.",
  },
  {
    icon: Heart,
    title: "OTC Producten",
    tag: "OTC",
    desc: "Breed assortiment vrij verkrijgbare geneesmiddelen. Van pijnstillers tot vitaminen — snel en betrouwbaar geleverd aan apotheken en zorgverleners.",
  },
  {
    icon: Stethoscope,
    title: "Medische Hulpmiddelen",
    tag: "MED",
    desc: "Uitgebreid aanbod klinische benodigdheden en medische apparatuur. CE-gecertificeerde producten met volledige documentatie en technische ondersteuning.",
  },
];

const ServiceGrid = () => {
  return (
    <section id="diensten" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-up">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            Onze Diensten
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            Volledige Farmaceutische
            <br />
            <span className="gradient-accent-text">Distributie</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`glass-card-hover p-8 group fade-up fade-up-delay-${i + 1}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary">
                  {service.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
