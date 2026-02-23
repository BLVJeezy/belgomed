import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
}

const Counter = ({ end, prefix = "", suffix = "", label, duration = 3000 }: CounterProps) => {
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
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary">
        {prefix}{count.toLocaleString("nl-BE")}{suffix}
      </div>
      <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-[200px] mx-auto">{label}</p>
    </div>
  );
};

const StatsCounter = () => {
  const { t } = useLang();

  return (
    <section className="py-10 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          <Counter end={20000} prefix="+" label={t("stats.products")} />
          <Counter end={10000} prefix="+" label={t("stats.deliveries")} />
          <Counter end={250} prefix="+" label={t("stats.clients")} />
          <Counter end={32} label={t("stats.team")} />
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
