import { MapPin, Phone, Mail, Linkedin } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const Footer = () => {
  const { t } = useLang();

  const navItems = [
  { label: t("diensten.title"), href: "#diensten" },
  { label: t("process.title"), href: "#process" },
  { label: t("nav.contact"), href: "#contact" }];


  return (
    <footer className="border-t border-border/30 py-10 md:py-16" role="contentinfo">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <span className="text-lg font-bold tracking-wider gradient-accent-text">BELGOMED BV</span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{t("footer.desc")}</p>
            <div className="text-xs text-muted-foreground/60 mt-2 space-y-0.5">
              <p>Trichterheideweg 11, 3500 Hasselt, België</p>
              <p>KBO: [VUL KBO-NUMMER IN]</p>
              <p>BTW: [VUL BTW-NUMMER IN]</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-4">{t("footer.nav")}</h4>
            <div className="space-y-2">
              {navItems.map((item) =>
              <a key={item.label} href={item.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </a>
              )}
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
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">info@belgomed.be</span>
              </div>
              <a href="https://www.linkedin.com/company/belgomed" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-3">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Belgomed BV. {t("footer.rights")}</p>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline">
              {t("footer.terms")}
            </a>
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline">
              {t("footer.privacy")}
            </a>
            <a href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline">
              {t("footer.cookies")}
            </a>
          </div>
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4 w-full md:w-auto">
            <p className="text-xs text-muted-foreground">{t("footer.regulated")}</p>
            <a href="/admin" className="px-5 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm w-full md:w-auto text-center">
              Belgomed Hub
            </a>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;