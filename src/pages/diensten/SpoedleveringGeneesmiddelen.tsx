import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Faq, CTA } from "@/components/seo/SeoPageHelpers";
import ContactForm from "@/components/ContactForm";
import { serviceSchema, faqSchema } from "@/lib/seoSchemas";

const TITLE = "Spoedlevering Geneesmiddelen België";
const FAQ = [
  { q: "Hoe snel kan een spoedlevering ter plaatse zijn?", a: "Afhankelijk van uw locatie binnen België verzorgen wij dezelfde dag of binnen 24 uur een prioritaire levering, met een vast aanspreekpunt voor opvolging." },
  { q: "Welke producten kunnen via spoed geleverd worden?", a: "Zowel RX-medicijnen, OTC-producten als medische hulpmiddelen — voor zover beschikbaar in onze voorraad. Bij schaarste activeren wij ons netwerk om alternatieven te zoeken." },
  { q: "Wat kost een spoedlevering?", a: "Spoedlevering wordt transparant geprijsd op basis van afstand en urgentie. Vraag een offerte aan via info@belgomed.com voor uw specifieke situatie." },
];

const SpoedleveringGeneesmiddelen = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }, { label: "Spoedlevering" }]}>
    <SEO
      title={`${TITLE} | Belgomed BV`}
      description="Snelle levering van geneesmiddelen en medisch materiaal wanneer uw voorraad kritiek is. Nationale dekking, prioritaire orderverwerking."
      keywords="spoedlevering geneesmiddelen, dringende medicijnen levering België, urgente farmaceutische distributie, noodlevering apotheek ziekenhuis"
      canonical="/diensten/spoedlevering-geneesmiddelen"
      jsonLd={[serviceSchema(TITLE), faqSchema(FAQ)]}
    />
    <H1>{TITLE}</H1>
    <Lead>Snelle levering van geneesmiddelen en medisch materiaal wanneer uw voorraad kritiek is.</Lead>

    <H2>Wanneer elke minuut telt</H2>
    <P>Voorraadcrises komen onverwacht: een plotse stijging in vraag, een leverancier die uitvalt, of een geneesmiddel dat tijdelijk schaars is op de Belgische markt. Voor apotheken en ziekenhuizen kan dit directe gevolgen hebben voor patiëntenzorg. Het wachten op een standaardlevering is dan geen optie.</P>

    <H2>De respons van Belgomed</H2>
    <P>Belgomed BV organiseert spoedleveringen met prioritaire orderverwerking, nationale dekking vanuit ons distributiecentrum in Hasselt, en direct contact met een vaste verantwoordelijke. Wij activeren in dergelijke situaties ons volledige netwerk om de juiste producten zo snel mogelijk bij u te krijgen — GDP-conform, met volledige traceerbaarheid.</P>

    <H2>Heeft u nu een dringende aanvraag?</H2>
    <P>Neem contact op via info@belgomed.com en vermeld duidelijk "spoed" in uw onderwerpregel.</P>

    <H2>Veelgestelde vragen</H2>
    <Faq items={FAQ} />

    <CTA href="#contact">Offerte aanvragen</CTA>
    <ContactForm />
  </PageLayout>
);

export default SpoedleveringGeneesmiddelen;