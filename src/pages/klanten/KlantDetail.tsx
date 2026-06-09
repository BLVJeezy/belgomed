import { useParams, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Faq, CTA } from "@/components/seo/SeoPageHelpers";
import ContactForm from "@/components/ContactForm";
import { audienceServiceSchema, faqSchema } from "@/lib/seoSchemas";

interface Segment {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  audience: string;
  paragraphs: [string, string, string];
  faq: { q: string; a: string }[];
  crumb: string;
}

const SEGMENTS: Record<string, Segment> = {
  apotheek: {
    slug: "apotheek",
    title: "Groothandel voor Apotheken",
    metaTitle: "Groothandel voor Apotheken | Belgomed BV",
    metaDescription: "GDP-gecertificeerde groothandel voor apotheken in België. Volledig RX- en OTC-assortiment, snelle levering, FAGG-conform.",
    keywords: "groothandel apotheken België, apotheek leverancier, RX OTC apotheek, farmaceutische leverancier apotheek",
    h1: "Belgomed BV — GDP-gecertificeerde groothandel voor apotheken in België",
    audience: "Apotheken",
    crumb: "Apotheken",
    paragraphs: [
      "Zelfstandige apotheken en apothekersgroepen hebben nood aan één betrouwbare partner voor zowel RX-medicijnen als OTC-producten. Het jongleren met meerdere leveranciers, wisselende prijzen en onregelmatige beschikbaarheid kost dagelijks tijd die beter aan de patiënt besteed wordt.",
      "Belgomed BV biedt apothekers een volledig portfolio — voorschriftplichtige geneesmiddelen, vrij verkrijgbare producten en medische hulpmiddelen — gedistribueerd volgens GDP-richtlijnen en met volledige FAGG-conformiteit. Snelle dagelijkse levering, transparante prijzen en een vast aanspreekpunt zorgen voor de operationele rust die uw team verdient.",
      "Neem contact op via info@belgomed.be en wij helpen u graag verder.",
    ],
    faq: [
      { q: "Levert Belgomed dagelijks aan apotheken?", a: "Ja, wij verzorgen dagelijkse leveringen aan apotheken in heel België, met vaste afhaalmomenten en mogelijkheid tot spoedlevering." },
      { q: "Welke productgroepen kan ik bestellen?", a: "Het volledige assortiment: RX-medicijnen, OTC-producten en medische hulpmiddelen — generiek en specialiteiten — onder één bestelplatform." },
      { q: "Hoe wordt de prijs van een offerte bepaald?", a: "Op basis van uw verwachte volumes en productmix. Wij streven naar transparante, competitieve voorwaarden zonder verborgen kosten." },
    ],
  },
  ziekenhuis: {
    slug: "ziekenhuis",
    title: "Geneesmiddelenleverancier voor Ziekenhuizen",
    metaTitle: "Geneesmiddelenleverancier Ziekenhuizen | Belgomed BV",
    metaDescription: "Betrouwbare geneesmiddelenleverancier voor Belgische ziekenhuizen. GDP- en WDA-gecertificeerd, volledige batchtraceerbaarheid.",
    keywords: "geneesmiddelenleverancier ziekenhuis, farmaceutische leverancier ziekenhuis België, RX ziekenhuis groothandel, FAGG ziekenhuisapotheek",
    h1: "Betrouwbare geneesmiddelenleverancier voor Belgische ziekenhuizen",
    audience: "Ziekenhuizen",
    crumb: "Ziekenhuizen",
    paragraphs: [
      "Ziekenhuisapotheken werken in een omgeving waarin elke afwijking telt: batchtraceerbaarheid is wettelijk verplicht, koudeketens mogen niet onderbroken worden en de inkoopvolumes vereisen een leverancier met capaciteit. Het minste defect in de aanvoer heeft directe impact op afdelingen, planning en patiëntveiligheid.",
      "Belgomed BV bedient ziekenhuizen vanuit een GDP- en WDA-gecertificeerde infrastructuur, met continue temperatuurmonitoring, batchregistratie en gedocumenteerde chain of custody. Onze logistiek is afgestemd op planmatige leveringen én op spoedinterventies — telkens met een vast contactpunt voor uw aankoopdienst.",
      "Klaar om samen te werken? Neem contact op via info@belgomed.be om de mogelijkheden voor uw ziekenhuis te bespreken.",
    ],
    faq: [
      { q: "Hoe wordt batchtraceerbaarheid gegarandeerd?", a: "Elke levering bevat volledige batch- en lotinformatie, opgenomen in onze digitale chain of custody — beschikbaar voor uw audits en inspecties." },
      { q: "Kan Belgomed grote ziekenhuisvolumes aan?", a: "Ja. Onze distributiecapaciteit en voorraadbeheer zijn geschikt voor zowel regionale als grote universitaire ziekenhuizen." },
      { q: "Hoe verloopt de samenwerking met de ziekenhuisapotheek?", a: "Via een vast aanspreekpunt, gestructureerde leveringsschema's en een SLA-gedreven aanpak rond beschikbaarheid en spoedrespons." },
    ],
  },
  woonzorgcentrum: {
    slug: "woonzorgcentrum",
    title: "Medicijnenleverancier voor Woonzorgcentra",
    metaTitle: "Medicijnenleverancier Woonzorgcentra | Belgomed BV",
    metaDescription: "Vaste medicijnenaanvoer voor woonzorgcentra in België. GDP-gecertificeerd, één partner voor RX, OTC en medisch materiaal.",
    keywords: "medicijnenleverancier woonzorgcentrum, WZC farmaceutische leverancier, rusthuis medicijnen, RX OTC WZC België",
    h1: "Vaste medicijnenaanvoer voor woonzorgcentra in België",
    audience: "Woonzorgcentra",
    crumb: "Woonzorgcentra",
    paragraphs: [
      "Woonzorgcentra hebben behoefte aan voorspelbaarheid: vaste leveringsmomenten, een gekende productmix en korte communicatielijnen wanneer er iets verandert. Het beheer van meerdere leveranciers met elk hun eigen administratie weegt zwaar op het hoofdverpleegkundig team en op de aankoopverantwoordelijke.",
      "Belgomed BV neemt die operationele complexiteit weg met één GDP-gecertificeerde keten voor RX, OTC én medisch materiaal. Vaste leveringsschema's, gegroepeerde facturatie, batchtraceerbaarheid en een vast aanspreekpunt geven uw WZC de rust om zich te richten op de bewoners.",
      "Hoe kan Belgomed uw woonzorgcentrum ondersteunen? Neem contact op via info@belgomed.be en wij helpen u graag verder.",
    ],
    faq: [
      { q: "Werkt Belgomed met vaste leveringsschema's?", a: "Ja. Wij plannen wekelijkse of meerdaagse leveringen volgens uw bewonersaantal en zorgprofiel, met spoedleveringen indien nodig." },
      { q: "Kunnen we facturen consolideren?", a: "Zeker. Gegroepeerde facturatie per leveringscyclus is mogelijk om de administratieve last te beperken." },
      { q: "Bieden jullie ondersteuning bij FAGG-inspecties?", a: "Wij leveren alle vereiste batch- en distributiedocumentatie aan, zodat uw WZC volledig conform blijft tijdens inspecties." },
    ],
  },
  thuiszorg: {
    slug: "thuiszorg",
    title: "Leverancier voor Thuiszorgorganisaties",
    metaTitle: "Leverancier Thuiszorgorganisaties | Belgomed BV",
    metaDescription: "Medisch materiaal en geneesmiddelen voor thuiszorgorganisaties in België. Flexibele orders, snelle levering, GDP-conform.",
    keywords: "leverancier thuiszorg, medisch materiaal thuisverpleging, OTC thuiszorgorganisatie België, verbandmateriaal thuiszorg",
    h1: "Medisch materiaal en geneesmiddelen voor thuiszorg in België",
    audience: "Thuiszorgorganisaties",
    crumb: "Thuiszorg",
    paragraphs: [
      "Thuiszorgorganisaties opereren decentraal: verpleegkundigen werken bij de patiënt thuis, met variabele zorgvragen en weinig ruimte voor logistieke fouten. Een gemiste levering of onvolledige set materiaal heeft directe impact op het zorgtraject.",
      "Belgomed BV ondersteunt thuiszorgorganisaties met een flexibel bestelsysteem, snelle leveringen vanuit ons centraal distributiecentrum en een breed assortiment OTC, verbandmateriaal en medische hulpmiddelen — GDP-gecertificeerd en FAGG-conform.",
      "Hoe kan Belgomed uw thuiszorgorganisatie ondersteunen? Neem contact op via info@belgomed.be en wij helpen u graag verder.",
    ],
    faq: [
      { q: "Kunnen jullie leveren op meerdere locaties?", a: "Ja, wij organiseren leveringen op één centraal punt of verspreid naar verschillende uitvalsbases van uw organisatie." },
      { q: "Welke productgroepen zijn beschikbaar?", a: "OTC-producten, verbandmateriaal, incontinentiezorg, injectiemateriaal en een breed gamma medische hulpmiddelen." },
      { q: "Hoe snel verwerken jullie kleine herhaalbestellingen?", a: "Vaste klanten kunnen via ons platform binnen enkele minuten een herhaalorder plaatsen, met levering binnen 24-48 uur." },
    ],
  },
};

const KlantDetail = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const data = SEGMENTS[slug];
  if (!data) return <Navigate to="/" replace />;

  return (
    <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wij Leveren Aan" }, { label: data.crumb }]}>
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        keywords={data.keywords}
        canonical={`/klanten/${data.slug}`}
        jsonLd={[audienceServiceSchema(data.audience), faqSchema(data.faq)]}
      />
      <H1>{data.h1}</H1>
      <Lead>{data.paragraphs[0]}</Lead>

      <H2>De aanpak van Belgomed</H2>
      <P>{data.paragraphs[1]}</P>

      <H2>Hoe kan Belgomed u ondersteunen?</H2>
      <P>{data.paragraphs[2]}</P>

      <H2>Veelgestelde vragen</H2>
      <Faq items={data.faq} />

      <CTA href="#contact">Neem contact op</CTA>
      <ContactForm />
    </PageLayout>
  );
};

export default KlantDetail;