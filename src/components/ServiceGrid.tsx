import { Pill, Heart, Stethoscope } from "lucide-react";
import serviceRx from "@/assets/service-rx.jpg";
import serviceOtc from "@/assets/service-otc.jpg";
import serviceMed from "@/assets/service-med.jpg";
import { useLang } from "@/contexts/LangContext";

const serviceData = [
  { icon: Pill, tag: "RX", image: serviceRx, titleKey: "sg.rx.title", descKey: "sg.rx.desc" },
  { icon: Heart, tag: "OTC", image: serviceOtc, titleKey: "sg.otc.title", descKey: "sg.otc.desc" },
  { icon: Stethoscope, tag: "MED", image: serviceMed, titleKey: "sg.med.title", descKey: "sg.med.desc" },
];

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
      </div>
    </section>
  );
};

export default ServiceGrid;
