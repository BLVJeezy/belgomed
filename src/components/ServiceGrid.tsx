import { Pill, Heart, Stethoscope } from "lucide-react";
import serviceRx from "@/assets/service-rx.jpg";
import serviceOtc from "@/assets/service-otc.jpg";
import serviceMed from "@/assets/service-med.jpg";

const services = [
  {
    icon: Pill,
    title: "Medicijnen op Voorschrift",
    tag: "RX",
    image: serviceRx,
    desc: "Veilige en hoogwaardige distributie van voorschriftgeneesmiddelen. Gegarandeerde traceerbaarheid en cold-chain compliance voor alle farmaceutische producten.",
  },
  {
    icon: Heart,
    title: "OTC Producten",
    tag: "OTC",
    image: serviceOtc,
    desc: "Breed assortiment vrij verkrijgbare geneesmiddelen. Van pijnstillers tot vitaminen — snel en betrouwbaar geleverd aan apotheken en zorgverleners.",
  },
  {
    icon: Stethoscope,
    title: "Medische Hulpmiddelen",
    tag: "MED",
    image: serviceMed,
    desc: "Uitgebreid aanbod klinische benodigdheden en medische apparatuur. CE-gecertificeerde producten met volledige documentatie en technische ondersteuning.",
  },
];

const ServiceGrid = () => {
  return (
    <section id="diensten" className="py-14 md:py-24 relative">
      <div className="container mx-auto px-5 md:px-6">
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
              className={`glass-card-hover overflow-hidden group fade-up fade-up-delay-${i + 1}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <span className="absolute top-3 right-3 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-primary/30 text-primary bg-background/60 backdrop-blur-sm">
                  {service.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
