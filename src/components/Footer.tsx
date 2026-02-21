import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold tracking-wider gradient-accent-text">
              BELGOMED
            </span>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Belgomed BV — Uw vertrouwde partner voor farmaceutische distributie
              met volledige GDP en WDA compliance.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-4">
              Navigatie
            </h4>
            <div className="space-y-2">
              {["Onze Diensten", "Licenties", "Producten", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Trichterheideweg 11, 3500 Hasselt, België
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +32 (0) 11 00 00 00
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  info@belgomed.be
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Belgomed BV. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-muted-foreground">
            FAGG Gereguleerd · GDP Gecertificeerd · WDA Vergund
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
