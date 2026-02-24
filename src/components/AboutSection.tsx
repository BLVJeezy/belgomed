import { Shield, Award, FileCheck, Building2, Brain, Home, HeartHandshake, Cross, Hospital, Truck, Package, Users, Cog, Lightbulb, ClipboardList } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import pharmacyImage from "@/assets/pharmacy-hasselt.jpg";
import ServiceGrid from "@/components/ServiceGrid";
import StatsCounter from "@/components/StatsCounter";
import { useLang } from "@/contexts/LangContext";

const sectorIcons = [Cross, Hospital, Building2, Brain, Home, HeartHandshake];
const sectorKeys = ["sector.pharmacies", "sector.hospitals", "sector.care", "sector.psychiatric", "sector.polyclinic", "sector.ngo"];
const dienstIcons = [Truck, Package, Users, Cog, Lightbulb, ClipboardList];

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const ScrollReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s` }}>
      {children}
    </div>
  );
};

const AboutSection = () => {
  const { t } = useLang();

  return (
    <div id="overons">
      {/* Expertise */}
      <section className="py-14 md:py-20 lg:py-24 bg-background dark:bg-gradient-to-r dark:from-[#001a1a] dark:to-[#004d4d] px-5 md:px-6 lg:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 md:mb-4">{t("about.tag")}</p>
            <h2 className="text-2xl md:text-3xl font-black text-foreground dark:text-white mb-6 md:mb-8 uppercase leading-none lg:text-2xl whitespace-pre-line">
              {t("about.title")}
            </h2>
            <div className="space-y-5 text-muted-foreground dark:text-white/60 leading-relaxed text-sm lg:text-base">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>
            <a href="#contact" className="inline-block mt-8 px-8 py-3 bg-primary text-primary-foreground font-black uppercase text-sm tracking-widest hover:bg-primary/90 transition-colors rounded-sm">
              {t("about.cta")}
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="aspect-square relative overflow-hidden group rounded-sm">
              <img src={pharmacyImage} alt="Belgische apotheek" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-all duration-500" />
              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="text-3xl lg:text-4xl font-black">{t("about.location")}</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mt-1">{t("about.locationSub")}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <StatsCounter />

      {/* Sectoren */}
      <section className="py-12 md:py-16 lg:py-20 bg-background dark:bg-gradient-to-r dark:from-[#001a1a] dark:to-[#004d4d] overflow-hidden">
        <div className="container mx-auto px-5 md:px-6 lg:px-12 mb-8 md:mb-10">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 text-center">{t("sectors.tag")}</p>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground dark:text-white mb-0 uppercase leading-none text-center">
              {t("sectors.title")}
            </h2>
          </ScrollReveal>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background dark:from-[#001a1a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background dark:from-[#004d4d] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="flex gap-2 animate-infinite-scroll w-max">
              {[...sectorIcons, ...sectorIcons].map((Icon, i) => (
                <div key={i} className="flex-shrink-0 flex flex-col items-center gap-3 px-4 md:px-8 lg:px-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl border border-border dark:border-white/10 bg-secondary/50 dark:bg-white/5 flex items-center justify-center">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-foreground/80 dark:text-white/80 whitespace-nowrap">{t(sectorKeys[i % sectorKeys.length])}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid />

      {/* Diensten */}
      <section className="py-14 md:py-20 lg:py-24 bg-background dark:bg-gradient-to-r dark:from-[#001a1a] dark:to-[#004d4d] px-5 md:px-6 lg:px-12">
        <div className="container mx-auto">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 md:mb-4 text-center">{t("diensten.tag")}</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground dark:text-white mb-10 md:mb-16 uppercase leading-none text-center">
              {t("diensten.title")}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {dienstIcons.map((Icon, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-6 md:p-8 lg:p-10 border border-border dark:border-white/10 bg-secondary/50 dark:bg-white/5 backdrop-blur-sm rounded-sm h-full">
                  <Icon className="w-8 h-8 text-primary mb-4 md:mb-5" strokeWidth={1.5} />
                  <h4 className="text-sm md:text-base font-black text-foreground dark:text-white uppercase tracking-wide mb-2 md:mb-3">{t(`dienst.${i + 1}.title`)}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{t(`dienst.${i + 1}.desc`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
