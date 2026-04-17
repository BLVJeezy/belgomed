import { useEffect } from "react";
import { useLang } from "@/contexts/LangContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqKeys = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
  { q: "faq.q9", a: "faq.a9" },
  { q: "faq.q10", a: "faq.a10" },
  { q: "faq.q11", a: "faq.a11" },
];

const FAQSection = () => {
  const { t } = useLang();

  // Inject JSON-LD FAQPage structured data
  useEffect(() => {
    const faqItems = faqKeys.map((faq) => ({
      "@type": "Question",
      name: t(faq.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(faq.a),
      },
    }));

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems,
    });

    // Remove old one if language changed
    const existing = document.getElementById("faq-jsonld");
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("faq-jsonld");
      if (el) el.remove();
    };
  }, [t]);

  return (
    <section id="faq" className="py-14 md:py-20 px-5 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium">
            {t("faq.tag")}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
            {t("faq.title")}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqKeys.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass-card px-6 border-border/30"
            >
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary py-5">
                {t(faq.q)}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {t(faq.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
