import { useLang } from "@/contexts/LangContext";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-5 md:px-6 py-16 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("terms.back")}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("privacy.heading")}</h1>
        <p className="text-sm text-muted-foreground mb-10">{t("privacy.version")}</p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. {t("privacy.s1.title")}</h2>
            <p>{t("privacy.s1.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. {t("privacy.s2.title")}</h2>
            <p>{t("privacy.s2.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. {t("privacy.s3.title")}</h2>
            <p>{t("privacy.s3.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. {t("privacy.s4.title")}</h2>
            <p>{t("privacy.s4.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. {t("privacy.s5.title")}</h2>
            <p>{t("privacy.s5.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. {t("privacy.s6.title")}</h2>
            <p>{t("privacy.s6.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. {t("privacy.s7.title")}</h2>
            <p>{t("privacy.s7.body")}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. {t("privacy.s8.title")}</h2>
            <p>{t("privacy.s8.body")}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
