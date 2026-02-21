import { Shield, Award, FileCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import pharmacyImage from "@/assets/pharmacy-hasselt.jpg";

const timelineEvents = [
  { year: "1974", title: "Oprichting", desc: "Belgomed wordt opgericht als farmaceutische groothandel in België." },
  { year: "1990", title: "Internationale Expansie", desc: "Start van export naar Centraal-Afrika en het Midden-Oosten." },
  { year: "2005", title: "GDP-Certificering", desc: "Officiële GDP-certificering voor farmaceutische distributie." },
  { year: "2015", title: "WDA-Vergunning", desc: "Verkrijging van de Wholesale Distribution Authorisation." },
  { year: "Heden", title: "Marktleider", desc: "45+ jaar ervaring, opererend vanuit ons distributiecentrum in Hasselt." },
];

const pillars = [
  { icon: Shield, title: "Betrouwbaarheid", desc: "Decennialange ervaring als stabiele partner in farmaceutische logistiek." },
  { icon: Award, title: "Kwaliteit", desc: "GDP-gecertificeerde processen garanderen de hoogste standaarden." },
  { icon: FileCheck, title: "Transparantie", desc: "Volledige traceerbaarheid en open communicatie met alle partners." },
];

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const ScrollReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  return (
    <div id="overons">
      {/* Hero */}
      <section className="relative py-28 lg:py-36 bg-gradient-to-r from-[#001a1a] to-[#004d4d] overflow-hidden">
        <ScrollReveal className="container mx-auto px-6 lg:px-12 relative z-10">
          <h2 className="text-foreground text-4xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
            Sinds 1974 <br />
            <span className="text-primary">Uw Medische Partner.</span>
          </h2>
          <p className="text-foreground/60 text-lg lg:text-xl max-w-2xl font-light">
            Belgomed BV is meer dan een groothandel; wij zijn de schakel tussen hoogwaardige farmaceutica en de patiënten die ze het hardst nodig hebben.
          </p>
        </ScrollReveal>
        <div className="absolute right-[-50px] bottom-[-50px] text-foreground/5 text-[200px] lg:text-[300px] font-black pointer-events-none select-none leading-none">
          B
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-[#001a1a] to-[#004d4d] px-6 lg:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Onze Expertise</p>
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-8 uppercase leading-none">
              GDP-Gecertificeerde <br />Uitmuntendheid
            </h3>
            <div className="space-y-5 text-white/60 leading-relaxed text-sm lg:text-base">
              <p>
                Als <strong className="text-white">GDP-gecertificeerde Belgische groothandel</strong> garandeert Belgomed BV constante temperatuurmonitoring en naleving van de hoogste hygiënestandaarden.
              </p>
              <p>
                Al onze processen voldoen strikt aan de hoge eisen die worden opgelegd door het <strong className="text-white">FAGG</strong>. Wij bieden een breed gamma aan OTC, RX-medicatie en medische hulpmiddelen.
              </p>
            </div>
            <a href="#contact" className="inline-block mt-8 px-8 py-3 bg-primary text-primary-foreground font-black uppercase text-sm tracking-widest hover:bg-primary/90 transition-colors rounded-sm">
              Neem Contact Op
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="aspect-square relative overflow-hidden group rounded-sm">
              <img src={pharmacyImage} alt="Belgische apotheek" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-all duration-500" />
              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="text-3xl lg:text-4xl font-black">Hasselt, BE</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mt-1">Logistiek Zenuwcentrum</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Certification Grid */}
      <section className="py-20 lg:py-24 bg-slate-50 border-y border-slate-200 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { value: "45+", label: "Jaren Ervaring", desc: "Expertise in export naar Centraal-Afrika.", borderColor: "border-primary" },
              { value: "FAGG", label: "Regulering", desc: "Strikte naleving van alle farmaceutische wetgeving.", borderColor: "border-[#001a1a]" },
              { value: "WDA", label: "Licensed", desc: "Uw geautoriseerde groothandel voor medicijnen.", borderColor: "border-slate-300" },
            ].map((card, i) => (
              <ScrollReveal key={card.value} delay={i * 0.15}>
                <div className={`p-8 lg:p-10 bg-white shadow-sm border-t-4 ${card.borderColor}`}>
                  <div className="text-3xl font-black mb-3 text-[#001a1a]">{card.value}</div>
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">{card.label}</p>
                  <p className="text-xs text-slate-500 italic">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-24 bg-white px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 text-center">Onze Geschiedenis</p>
            <h3 className="text-3xl lg:text-4xl font-black text-[#001a1a] mb-16 uppercase leading-none text-center">
              45+ Jaar Groei
            </h3>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
            <div className="space-y-12">
              {timelineEvents.map((event, i) => (
                <ScrollReveal key={event.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-1.5 ring-4 ring-white z-10" />
                    <div className={`ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] ${i % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12 lg:ml-auto"}`}>
                      <span className="text-xs font-black text-primary uppercase tracking-widest">{event.year}</span>
                      <h4 className="text-lg font-black text-[#001a1a] uppercase mt-1">{event.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{event.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values / Pillars */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-[#001a1a] to-[#004d4d] px-6 lg:px-12">
        <div className="container mx-auto">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 text-center">Onze Waarden</p>
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-16 uppercase leading-none text-center">
              Drie Pijlers
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.15}>
                <div className="p-8 lg:p-10 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm text-center">
                  <p.icon className="w-8 h-8 text-primary mx-auto mb-5" />
                  <h4 className="text-lg font-black text-white uppercase tracking-wide mb-3">{p.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
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
