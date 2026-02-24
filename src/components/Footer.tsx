import { MapPin, Phone, Mail } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const Footer = () => {
  const { t } = useLang();

  const navItems = [
    { label: t("nav.services"), href: "#diensten" },
    { label: t("nav.about"), href: "#overons" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="border-t border-border/30 py-10 md:py-16" role="contentinfo">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <span className="text-lg font-bold tracking-wider gradient-accent-text">BELGOMED</span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{t("footer.desc")}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-4">{t("footer.nav")}</h4>
            <div className="space-y-2">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-4">{t("footer.contact")}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Trichterheideweg 11, 3500 Hasselt, België</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+32 (0) 11 00 00 00</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">info@belgomed.be</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Belgomed BV. {t("footer.rights")}</p>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline">
              {t("footer.terms")}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">{t("footer.regulated")}</p>
            <a href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline">
              My Belgomed
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
