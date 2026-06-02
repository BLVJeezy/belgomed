import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { LangProvider } from "@/contexts/LangContext";

interface Crumb {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: ReactNode;
  breadcrumbs?: Crumb[];
}

const PageLayout = ({ children, breadcrumbs }: PageLayoutProps) => {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pt-28 md:pt-32 pb-16">
          <div className="container mx-auto px-5 md:px-6 max-w-4xl">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav aria-label="Kruimelpad" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground mb-8">
                {breadcrumbs.map((c, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="w-3 h-3" />}
                    {c.href ? (
                      <a href={c.href} className="hover:text-primary transition-colors">{c.label}</a>
                    ) : (
                      <span className="text-foreground">{c.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            <article className="space-y-6">{children}</article>
          </div>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </LangProvider>
  );
};

export default PageLayout;