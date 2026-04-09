import { LangProvider, useLang } from "@/contexts/LangContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiesContent = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-5 md:px-6 py-16 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("terms.back")}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("cookies.heading")}</h1>
        <p className="text-sm text-muted-foreground mb-10">{t("cookies.version")}</p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {i}. {t(`cookies.s${i}.title`)}
              </h2>
              <p className="whitespace-pre-line">{t(`cookies.s${i}.body`)}</p>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Cookies = () => (
  <LangProvider>
    <CookiesContent />
  </LangProvider>
);

export default Cookies;
