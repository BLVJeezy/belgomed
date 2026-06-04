import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, CTA } from "@/components/seo/SeoPageHelpers";
import BelgiumMap from "@/components/regio/BelgiumMap";
import ContactForm from "@/components/ContactForm";
import { audienceServiceSchema, faqSchema } from "@/lib/seoSchemas";

const FAQ = [
  { q: "Levert Belgomed in alle vijf de Vlaamse provincies?", a: "Ja. Vanuit ons distributiecentrum in Hasselt bedienen wij Antwerpen, Oost- en West-Vlaanderen, Vlaams-Brabant en Limburg met korte leadtijden." },
  { q: "Hoe snel zijn standaardleveringen in Vlaanderen?", a: "Standaardbestellingen worden doorgaans binnen 24-48 uur geleverd, met spoedoptie voor kritieke voorraadtekorten." },
  { q: "Werkt Belgomed met vaste leveringsschema's?", a: "Ja. Apotheken en zorginstellingen kunnen vaste leveringsdagen afspreken, afgestemd op hun bestelritme." },
];

const provinces = [
  { h: "Medische Groothandel Antwerpen", kw: "apotheek leverancier Antwerpen", body: "Wij bedienen apotheken en ziekenhuizen in Antwerpen en de Antwerpse Kempen met snelle leveringen van RX, OTC en medische hulpmiddelen." },
  { h: "Medische Groothandel Oost-Vlaanderen", kw: "medische groothandel Gent", body: "Van Gent tot het Waasland: Belgomed levert farmaceutische producten aan apotheken en zorginstellingen in Oost-Vlaanderen." },
  { h: "Medische Groothandel West-Vlaanderen", kw: "farmaceutische distributie Brugge", body: "Van Brugge tot Kortrijk verzorgen wij betrouwbare farmaceutische distributie aan apotheken en ziekenhuizen in West-Vlaanderen." },
  { h: "Medische Groothandel Vlaams-Brabant", kw: "apotheek leverancier Leuven", body: "Leuven en de regio Vlaams-Brabant: snelle leveringen voor apotheken, klinieken en universitaire ziekenhuizen." },
  { h: "Medische Groothandel Limburg", kw: "medische groothandel Hasselt", body: "Onze thuisprovincie. Vanuit Limburg bedienen wij apotheken in Hasselt, Genk, Tongeren en de bredere regio met de kortste leadtijden." },
];

const Vlaanderen = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Regio" }, { label: "Vlaanderen" }]}>
    <SEO
      title="Medische Groothandel Vlaanderen | Belgomed BV"
      description="Belgomed levert aan apotheken in heel Vlaanderen. Snelle levering in alle Vlaamse provincies. GDP gecertificeerd."
      keywords="medische groothandel Vlaanderen, apotheek leverancier Vlaanderen, medische groothandel Antwerpen, farmaceutische distributie Limburg, medische groothandel Gent"
      canonical="/regio/vlaanderen"
      jsonLd={[audienceServiceSchema("Apotheken, ziekenhuizen en zorginstellingen in Vlaanderen"), faqSchema(FAQ)]}
    />

    <H1>Medische Groothandel Vlaanderen</H1>
    <Lead>
      Belgomed BV verzorgt medische groothandel in heel Vlaanderen. Vanuit ons distributiecentrum leveren wij snel en betrouwbaar aan apotheken, ziekenhuizen en zorginstellingen in alle vijf de Vlaamse provincies.
    </Lead>

    <BelgiumMap
      active="vlaanderen"
      label="Vlaanderen — 5 provincies"
      sublabel="Antwerpen, Oost-Vlaanderen, West-Vlaanderen, Vlaams-Brabant en Limburg — bediend vanuit ons distributiecentrum."
    />

    {provinces.map((p) => (
      <div key={p.h}>
        <H2>{p.h}</H2>
        <P>{p.body} <a href="#contact" className="text-primary hover:underline">Vraag uw offerte aan →</a></P>
      </div>
    ))}

    <CTA href="#contact">Offerte aanvragen</CTA>

    <H2>Veelgestelde vragen</H2>
    <Faq items={FAQ} />

    <ContactForm />
  </PageLayout>
);

export default Vlaanderen;