import { ArrowRight, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-medication.jpg";
import logoHero from "@/assets/logo-belgomed-hero.png";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Farmaceutische producten en medicatie"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(180 100% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(180 100% 40%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 pt-36 pb-24 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6 fade-up">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
              GDP & WDA Gecertificeerd
            </span>
          </div>

          <img
            src={logoHero}
            alt="Belgomed — Betrouwbaar en Belgisch, voor uw gezondheid"
            className="max-w-md md:max-w-lg lg:max-w-xl w-full h-auto mb-6 fade-up fade-up-delay-1 dark:invert dark:hue-rotate-180"
          />

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 fade-up fade-up-delay-2">
            Belgomed BV: Uw vertrouwde medische groothandel met GDP en WDA
            vergunning. Kwaliteit, compliance en betrouwbare distributie.
          </p>

          <div className="flex flex-wrap gap-4 fade-up fade-up-delay-3">
            <a
              href="#diensten"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(180_100%_40%/0.3)]"
            >
              Onze Diensten
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold text-sm tracking-wide uppercase hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
