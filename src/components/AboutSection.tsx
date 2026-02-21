import { Shield, Award, FileCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import pharmacyImage from "@/assets/pharmacy-hasselt.jpg";

const timelineEvents = [
{ year: "1974", title: "Oprichting", desc: "Belgomed wordt opgericht als farmaceutische groothandel in België." },
{ year: "1990", title: "Internationale Expansie", desc: "Start van export naar Centraal-Afrika en het Midden-Oosten." },
{ year: "2005", title: "GDP-Certificering", desc: "Officiële GDP-certificering voor farmaceutische distributie." },
{ year: "2015", title: "WDA-Vergunning", desc: "Verkrijging van de Wholesale Distribution Authorisation." },
{ year: "Heden", title: "Marktleider", desc: "45+ jaar ervaring, opererend vanuit ons distributiecentrum in Hasselt." }];


const pillars = [
{ icon: Shield, title: "Betrouwbaarheid", desc: "Decennialange ervaring als stabiele partner in farmaceutische logistiek." },
{ icon: Award, title: "Kwaliteit", desc: "GDP-gecertificeerde processen garanderen de hoogste standaarden." },
{ icon: FileCheck, title: "Transparantie", desc: "Volledige traceerbaarheid en open communicatie met alle partners." }];


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

const ScrollReveal = ({ children, className = "", delay = 0 }: {children: React.ReactNode;className?: string;delay?: number;}) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`
      }}>

      {children}
    </div>);

};

const AboutSection = () => {
  return (
    <div id="overons">

      {/* Expertise */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-[#001a1a] to-[#004d4d] px-6 lg:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Onze Expertise</p>
            <h3 className="text-3xl font-black text-white mb-8 uppercase leading-none lg:text-2xl">
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
            {pillars.map((p, i) =>
            <ScrollReveal key={p.title} delay={i * 0.15}>
                <div className="p-8 lg:p-10 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm text-center">
                  <p.icon className="w-8 h-8 text-primary mx-auto mb-5" />
                  <h4 className="text-lg font-black text-white uppercase tracking-wide mb-3">{p.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </div>);

};

export default AboutSection;