import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Faq, CTA } from "@/components/seo/SeoPageHelpers";
import ContactForm from "@/components/ContactForm";
import { serviceSchema, faqSchema } from "@/lib/seoSchemas";

const TITLE = "Medisch Materiaal voor Thuiszorg";
const FAQ = [
  { q: "Kunnen thuiszorgorganisaties kleine bestellingen plaatsen?", a: "Ja. Onze ordersystemen zijn flexibel — van kleine spoedbestellingen tot wekelijkse vaste leveringen voor uw teams in het veld." },
  { q: "Welke producten zijn beschikbaar?", a: "Een breed assortiment OTC-producten, verbandmateriaal, incontinentiemateriaal, injectiematerialen en andere medische hulpmiddelen — allemaal CE-gemarkeerd en GDP-conform gedistribueerd." },
  { q: "Hoe snel kan ik beleverd worden?", a: "Standaardleveringen verlopen binnen 24-48 uur, met mogelijkheid tot spoedlevering bij kritieke voorraadtekorten." },
];

const ThuiszorgMedischMateriaal = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }, { label: TITLE }]}>
    <SEO
      title={`${TITLE} | Belgomed BV`}
      description="Levering van OTC-producten en medische hulpmiddelen voor thuiszorgorganisaties in België. Flexibel, snel en GDP-gecertificeerd."
      keywords="medisch materiaal thuiszorg, OTC thuiszorg leverancier, verbandmateriaal thuisverpleging België, medische hulpmiddelen thuiszorgorganisatie"
      canonical="/diensten/thuiszorg-medisch-materiaal"
      jsonLd={[serviceSchema(TITLE), faqSchema(FAQ)]}
    />
    <H1>{TITLE}</H1>
    <Lead>Levering van OTC-producten en medische hulpmiddelen voor thuiszorgorganisaties in België.</Lead>

    <H2>De realiteit van thuiszorg</H2>
    <P>Thuiszorgorganisaties hebben dagelijks nood aan een snelle en flexibele aanvoer van verbruiksgoederen en OTC-producten. Verpleegkundigen in het veld kunnen niet wachten op leveringen die te laat aankomen, en de variabele zorgvraag vereist een leverancier die mee kan schakelen — zowel in volume als in tempo.</P>

    <H2>De aanpak van Belgomed</H2>
    <P>Belgomed BV levert rechtstreeks aan thuiszorgorganisaties met een flexibel ordersysteem, GDP-gecertificeerde distributie en volledige FAGG-conformiteit. Onze logistiek is gebouwd op betrouwbaarheid: kleine en grote orders worden met dezelfde zorg verwerkt, en spoedleveringen worden geprioriteerd.</P>

    <H2>Hoe kan Belgomed uw thuiszorgorganisatie ondersteunen?</H2>
    <P>Neem contact op via info@belgomed.be en wij helpen u graag verder.</P>

    <H2>Veelgestelde vragen</H2>
    <Faq items={FAQ} />

    <CTA href="#contact">Neem contact op</CTA>
    <ContactForm />
  </PageLayout>
);

export default ThuiszorgMedischMateriaal;