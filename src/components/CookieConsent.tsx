import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LangContext";
import { X } from "lucide-react";

const COOKIE_KEY = "belgomed_cookie_consent";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookieConsent = () => {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (state: ConsentState) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...state, timestamp: Date.now() }));
    setVisible(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => save({ necessary: true, analytics: false, marketing: false });
  const saveSelection = () => save(consent);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-base font-semibold text-foreground">
            🍪 {t("cookie.title")}
          </h3>
          <button onClick={rejectAll} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {t("cookie.description")}{" "}
          <a href="/privacy" className="underline text-primary hover:text-primary/80 transition-colors">
            {t("cookie.privacyLink")}
          </a>.
        </p>

        {/* Detail toggle */}
        {showDetails && (
          <div className="space-y-3 mb-4 p-4 bg-secondary/50 rounded-xl">
            <label className="flex items-center gap-3 cursor-not-allowed opacity-70">
              <input type="checkbox" checked disabled className="accent-primary w-4 h-4" />
              <div>
                <span className="text-sm font-medium text-foreground">{t("cookie.necessary")}</span>
                <p className="text-xs text-muted-foreground">{t("cookie.necessaryDesc")}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                className="accent-primary w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium text-foreground">{t("cookie.analytics")}</span>
                <p className="text-xs text-muted-foreground">{t("cookie.analyticsDesc")}</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                className="accent-primary w-4 h-4"
              />
              <div>
                <span className="text-sm font-medium text-foreground">{t("cookie.marketing")}</span>
                <p className="text-xs text-muted-foreground">{t("cookie.marketingDesc")}</p>
              </div>
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            onClick={acceptAll}
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t("cookie.acceptAll")}
          </button>
          <button
            onClick={rejectAll}
            className="px-5 py-2.5 border border-border text-sm font-medium text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            {t("cookie.rejectAll")}
          </button>
          <button
            onClick={() => showDetails ? saveSelection() : setShowDetails(true)}
            className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {showDetails ? t("cookie.saveSelection") : t("cookie.customize")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
