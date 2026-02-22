import { Shield, Award, FileCheck, Building2, Brain, Home, HeartHandshake, Cross, Hospital, Truck, Package, Users, Cog, Lightbulb, ClipboardList } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import pharmacyImage from "@/assets/pharmacy-hasselt.jpg";
import ServiceGrid from "@/components/ServiceGrid";

const timelineEvents = [
{ year: "1974", title: "Oprichting", desc: "Belgomed wordt opgericht als farmaceutische groothandel in België." },
{ year: "1990", title: "Internationale Expansie", desc: "Start van export naar Centraal-Afrika en het Midden-Oosten." },
{ year: "2005", title: "GDP-Certificering", desc: "Officiële GDP-certificering voor farmaceutische distributie." },
{ year: "2015", title: "WDA-Vergunning", desc: "Verkrijging van de Wholesale Distribution Authorisation." },
{ year: "Heden", title: "Marktleider", desc: "45+ jaar ervaring, opererend vanuit ons distributiecentrum in Hasselt." }];


const diensten = [
  { icon: Truck, title: "Snelle landelijke distributie", desc: "In heel België zorgen wij voor een snelle en veilige levering van medicijnen." },
  { icon: Package, title: "Stockbeheer met reserve", desc: "Met een efficiënt stockbeheer en een noodreserve voorkomen wij tekorten, ook in crisissituaties." },
  { icon: Users, title: "Groepsaankoop en betere voorwaarden", desc: "Door een gezamenlijke aankoop bieden wij zorginstellingen betere voorwaarden en lagere kosten." },
  { icon: Cog, title: "Geoptimaliseerde processen", desc: "We nemen logistieke en administratieve taken uit handen, zodat zorgverleners meer ruimte krijgen om zich op patiënten te focussen." },
  { icon: Lightbulb, title: "Innovatieve oplossingen voor de zorg", desc: "Met innovatieve tools maken wij ons voorraadbeheer en distributie sneller, transparanter en betrouwbaarder." },
  { icon: ClipboardList, title: "Administratieve ontzorging", desc: "Wij nemen administratieve taken rondom medicijnbeheer en bestellingen uit handen, zodat zorgverleners zich volledig kunnen concentreren op hun patiënten." },
];

const sectors = [
  { icon: Cross, label: "Apotheken" },
  { icon: Hospital, label: "Ziekenhuizen" },
  { icon: Building2, label: "Woonzorgcentra" },
  { icon: Brain, label: "Psychiatrische instellingen" },
  { icon: Home, label: "Polikliniek" },
  { icon: HeartHandshake, label: "NGO" },
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
      <section className="py-14 md:py-20 lg:py-24 bg-background dark:bg-gradient-to-r dark:from-[#001a1a] dark:to-[#004d4d] px-5 md:px-6 lg:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 md:mb-4">Onze Expertise</p>
            <h3 className="text-2xl md:text-3xl font-black text-foreground dark:text-white mb-6 md:mb-8 uppercase leading-none lg:text-2xl">
              Jouw partner voor een <br />zorgeloos medicijnbeheer
            </h3>
            <div className="space-y-5 text-muted-foreground dark:text-white/60 leading-relaxed text-sm lg:text-base">
              <p>
                In de zorg is een goed gevulde voorraad medicijnen cruciaal. Tekorten leiden niet alleen tot uitgestelde behandelingen, maar verhogen ook de druk op zorgverleners en brengen extra risico's voor patiënten met zich mee. Belgomed BV helpt dit te voorkomen door apotheken, ziekenhuizen en andere zorginstellingen te voorzien van de juiste producten, met stabiele leveringen, concurrerende prijzen en volledig beheer van logistiek en administratie.
              </p>
              <p>
                Zo kunnen zorgverleners zich concentreren op wat écht telt: het welzijn van hun patiënten. We werken nauw samen met onze klanten en logistieke partners om processen efficiënt en betrouwbaar te laten verlopen. Met een strakke planning, een goedgevulde voorraad en doelgerichte oplossingen zorgen we dat medicijnen en medische hulpmiddelen altijd beschikbaar zijn.
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



      {/* Sectoren - Infinity Scroll */}
      <section className="py-12 md:py-16 lg:py-20 bg-background dark:bg-gradient-to-r dark:from-[#001a1a] dark:to-[#004d4d] overflow-hidden">
        <div className="container mx-auto px-5 md:px-6 lg:px-12 mb-8 md:mb-10">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 text-center">Wie We Bedienen</p>
            <h3 className="text-3xl lg:text-4xl font-black text-foreground dark:text-white mb-0 uppercase leading-none text-center">
              Onze Sectoren
            </h3>
          </ScrollReveal>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background dark:from-[#001a1a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background dark:from-[#004d4d] to-transparent z-10 pointer-events-none" />
          <div className="flex overflow-x-auto scrollbar-hide gap-2 px-5 md:px-12 py-2 snap-x snap-mandatory">
            {sectors.map((sector, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center gap-3 px-4 md:px-8 lg:px-10 snap-center">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl border border-border dark:border-white/10 bg-secondary/50 dark:bg-white/5 flex items-center justify-center">
                  <sector.icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs md:text-sm font-bold text-foreground/80 dark:text-white/80 whitespace-nowrap">{sector.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceGrid />

      {/* Onze Diensten */}
      <section className="py-14 md:py-20 lg:py-24 bg-background dark:bg-gradient-to-r dark:from-[#001a1a] dark:to-[#004d4d] px-5 md:px-6 lg:px-12">
        <div className="container mx-auto">
          <ScrollReveal>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 md:mb-4 text-center">Wat Wij Doen</p>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground dark:text-white mb-10 md:mb-16 uppercase leading-none text-center">
              Onze Diensten
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {diensten.map((d, i) =>
              <ScrollReveal key={d.title} delay={i * 0.1}>
                <div className="p-6 md:p-8 lg:p-10 border border-border dark:border-white/10 bg-secondary/50 dark:bg-white/5 backdrop-blur-sm rounded-sm h-full">
                  <d.icon className="w-8 h-8 text-primary mb-4 md:mb-5" strokeWidth={1.5} />
                  <h4 className="text-sm md:text-base font-black text-foreground dark:text-white uppercase tracking-wide mb-2 md:mb-3">{d.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground dark:text-white/60 leading-relaxed">{d.desc}</p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </div>);

};

export default AboutSection;