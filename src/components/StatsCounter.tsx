import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { Users, FileText, Heart, Handshake } from "lucide-react";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  duration?: number;
}

const Counter = ({ end, prefix = "", suffix = "", label, icon, duration = 3000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-3">
      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
        {prefix}{count.toLocaleString("nl-BE")}{suffix}
      </p>
      <div className="text-muted-foreground/50">
        {icon}
      </div>
      <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground max-w-[140px] leading-snug">{label}</p>
    </div>
  );
};

const StatsCounter = () => {
  const { t } = useLang();

  const stats = [
    { end: 15, prefix: "+", icon: <Users className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />, label: "Medewerkers" },
    { end: 12500, prefix: "+", icon: <FileText className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />, label: "Onze voorraad" },
    { end: 1, prefix: "+", icon: <Heart className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />, label: "Coöperatief hart" },
    { end: 200, prefix: "+", icon: <Handshake className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />, label: "Ziekenhuizen, rusthuizen & apothekers" },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-10">
          {stats.map((s, i) => (
            <Counter key={i} end={s.end} icon={s.icon} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
