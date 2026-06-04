import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Faq, CTA } from "@/components/seo/SeoPageHelpers";
import ContactForm from "@/components/ContactForm";
import { serviceSchema, faqSchema } from "@/lib/seoSchemas";

const TITLE = "Leverancier Woonzorgcentrum";
const FAQ = [
  { q: "Levert Belgomed aan elk type woonzorgcentrum?", a: "Ja. Wij bedienen openbare, private en groepsgebonden WZC en rusthuizen in heel België — ongeacht omvang of inrichting." },
  { q: "Kunnen we één vast leveringsmoment afspreken?", a: "Zeker. Wij plannen een vaste leveringsfrequentie afgestemd op uw bewonersaantallen, met spoedlevering bij dringende noden." },
  { q: "Verzorgen jullie ook OTC en medisch materiaal naast RX?", a: "Ja, één partner voor RX, OTC en medische hulpmiddelen — minder leveranciers, minder administratie, één GDP-gecertificeerde keten." },
];

const LeverancierWoonzorgcentrum = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }, { label: TITLE }]}>
    <SEO
      title={`${TITLE} | Belgomed BV`}
      description="Vaste en betrouwbare medicijnenaanvoer voor woonzorgcentra en rusthuizen in heel België. GDP-gecertificeerd, FAGG-conform."
      keywords="leverancier woonzorgcentrum, medicijnen rusthuis, RX OTC woonzorgcentrum, farmaceutische leverancier WZC België"
      canonical="/diensten/leverancier-woonzorgcentrum"
      jsonLd={[serviceSchema(TITLE), faqSchema(FAQ)]}
    />
    <H1>{TITLE}</H1>
    <Lead>Vaste en betrouwbare medicijnenaanvoer voor woonzorgcentra en rusthuizen in heel België.</Lead>

    <H2>De uitdaging in woonzorgcentra</H2>
    <P>Woonzorgcentra worstelen elke week met dezelfde vraagstukken: continuïteit van voorraad, druk van wijzigende FAGG- en GDP-vereisten, en het beheer van meerdere leveranciers voor RX-medicijnen, OTC-producten en medisch materiaal. Een onderbroken aanvoer betekent direct bijkomende administratieve last voor de hoofdverpleegkundige en bijkomende risico's voor de bewoners.</P>

    <H2>De oplossing van Belgomed</H2>
    <P>Belgomed BV biedt WZC één GDP-gecertificeerde partner met een breed portfolio aan RX, OTC én medische hulpmiddelen. Vaste leveringsschema's, batchtraceerbaarheid en koudeketenbeheer worden gecombineerd met persoonlijk contact en een vast aanspreekpunt. Zo blijft de focus van uw zorgteam waar die hoort: bij de bewoner.</P>

    <H2>Klaar voor een offerte op maat?</H2>
    <P>Neem contact op via info@belgomed.com voor een offerte op maat voor uw woonzorgcentrum.</P>

    <H2>Veelgestelde vragen</H2>
    <Faq items={FAQ} />

    <CTA href="#contact">Offerte aanvragen</CTA>
    <ContactForm />
  </PageLayout>
);

export default LeverancierWoonzorgcentrum;