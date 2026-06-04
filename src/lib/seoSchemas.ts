const BASE = "https://belgomed.com";

const provider = {
  "@type": "Organization",
  name: "Belgomed BV",
  url: BASE,
  email: "info@belgomed.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Trichterheideweg 11",
    addressLocality: "Hasselt",
    postalCode: "3500",
    addressCountry: "BE",
  },
};

export const serviceSchema = (serviceType: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType,
  provider,
  areaServed: { "@type": "Country", name: "Belgium" },
});

export const audienceServiceSchema = (audienceType: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Farmaceutische Groothandel",
  provider,
  audience: { "@type": "Audience", audienceType },
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
});