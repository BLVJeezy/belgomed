import { ArrowRight, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-medication.jpg";
import logoHero from "@/assets/logo-belgomed-hero.png";
import { useLang } from "@/contexts/LangContext";

const HeroSection = () => {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Farmaceutische producten en medicatie" className="w-full h-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(180 100% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(180 100% 40%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-5 md:px-6 pt-28 md:pt-36 pb-16 md:pb-24 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 md:mb-6 fade-up">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary font-medium">
              {t("hero.badge")}
            </span>
          </div>
          <img src={logoHero} alt="Belgomed BV — Medische Groothandel" className="max-w-[280px] md:max-w-lg lg:max-w-xl w-full h-auto mb-4 md:mb-6 fade-up fade-up-delay-1 dark:invert dark:hue-rotate-180" />
          <h1 className="sr-only">Belgomed BV — GDP &amp; WDA Gecertificeerde Medische Groothandel in Hasselt, België | Farmaceutische Distributie</h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 md:mb-10 fade-up fade-up-delay-2">
            {t("hero.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 fade-up fade-up-delay-3">
            <a href="#diensten" className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(180_100%_40%/0.3)]">
              {t("hero.cta")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-lg border border-border text-foreground font-semibold text-sm tracking-wide uppercase hover:border-primary/50 hover:text-primary transition-all duration-300">
              {t("hero.contact")}
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
