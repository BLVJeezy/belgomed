import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Faq, CTA } from "@/components/seo/SeoPageHelpers";
import ContactForm from "@/components/ContactForm";
import { serviceSchema, faqSchema } from "@/lib/seoSchemas";

const TITLE = "GDP-Gecertificeerde Farmaceutische Distributie";
const FAQ = [
  { q: "Wat betekent GDP-certificering precies?", a: "Good Distribution Practice is de Europese norm die garandeert dat geneesmiddelen tijdens transport en opslag hun kwaliteit en integriteit behouden — van producent tot eindgebruiker." },
  { q: "Wordt Belgomed gecontroleerd door het FAGG?", a: "Ja. Het Federaal Agentschap voor Geneesmiddelen en Gezondheidsproducten voert regelmatig inspecties uit op onze distributieprocessen, opslagcondities en documentatie." },
  { q: "Hoe wordt de koudeketen bewaakt?", a: "Met continue temperatuurmonitoring, gecertificeerde koelinstallaties en gevalideerde transportoplossingen — elke afwijking wordt automatisch geregistreerd en opgevolgd." },
];

const GdpGecertificeerdeDistributie = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }, { label: "GDP-Distributie" }]}>
    <SEO
      title={`${TITLE} | Belgomed BV`}
      description="Volledige naleving van Good Distribution Practice voor veilige geneesmiddelendistributie in België. GDP- en WDA-gecertificeerd, FAGG-geïnspecteerd."
      keywords="GDP gecertificeerde distributie, Good Distribution Practice België, WDA vergunning, FAGG inspectie farmaceutisch, koudeketen geneesmiddelen"
      canonical="/diensten/gdp-gecertificeerde-distributie"
      jsonLd={[serviceSchema(TITLE), faqSchema(FAQ)]}
    />
    <H1>{TITLE}</H1>
    <Lead>Volledige naleving van Good Distribution Practice voor veilige geneesmiddelendistributie in België.</Lead>

    <H2>Wat GDP en WDA betekenen voor uw inkoop</H2>
    <P>GDP (Good Distribution Practice) en de WDA-vergunning (Wholesale Distribution Authorisation) zijn de Europese hoekstenen voor veilige farmaceutische distributie. Voor apotheken, ziekenhuizen en zorginstellingen betekent dit zekerheid: elk geneesmiddel dat hen bereikt, heeft een gecontroleerde keten doorlopen waarin temperatuur, identiteit en herkomst onafgebroken bewaakt zijn.</P>

    <H2>Hoe Belgomed compliance in de praktijk brengt</H2>
    <P>Bij Belgomed BV is GDP geen papieren oefening. Onze faciliteiten zijn uitgerust met continue temperatuurmonitoring, sluitende audit trails, gevalideerde transportprocedures en een volledig gedocumenteerde chain of custody. Het FAGG inspecteert onze processen op regelmatige basis en wij investeren actief in kwaliteitsborging en personeelsopleiding.</P>

    <H2>Klaar om samen te werken?</H2>
    <P>Neem contact op via info@belgomed.be om de mogelijkheden voor uw organisatie te bespreken.</P>

    <H2>Veelgestelde vragen</H2>
    <Faq items={FAQ} />

    <CTA href="#contact">Neem contact op</CTA>
    <ContactForm />
  </PageLayout>
);

export default GdpGecertificeerdeDistributie;