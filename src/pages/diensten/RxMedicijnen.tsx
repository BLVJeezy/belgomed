import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Ul, CTA } from "@/components/seo/SeoPageHelpers";
import DienstFeatureGrid from "@/components/diensten/DienstFeatureGrid";
import ContactForm from "@/components/ContactForm";
import { Pill, ShieldCheck, Thermometer, FileCheck2 } from "lucide-react";
import { serviceSchema, faqSchema } from "@/lib/seoSchemas";

const FAQ = [
  { q: "Is Belgomed FAGG-goedgekeurd voor RX-distributie?", a: "Ja. Belgomed BV beschikt over een WDA-vergunning van het FAGG en distribueert voorschriftplichtige geneesmiddelen volledig conform de Europese GDP-richtlijnen." },
  { q: "Hoe wordt de koudeketen voor RX-producten gegarandeerd?", a: "Met continue temperatuurmonitoring, gevalideerde koelinstallaties en gecertificeerd koeltransport — elke afwijking wordt automatisch geregistreerd." },
  { q: "Welke RX-producten zijn beschikbaar?", a: "Een breed assortiment voorschriftplichtige geneesmiddelen, zowel generiek als specialiteiten, met volledige batch- en lottraceerbaarheid." },
];

const RxMedicijnen = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }, { label: "RX Medicijnen" }]}>
    <SEO
      title="RX Medicijnen Groothandel België | Belgomed BV"
      description="Belgomed levert voorschriftplichtige RX-medicijnen aan apotheken en ziekenhuizen in België. GDP-gecertificeerd, snelle levering, FAGG-goedgekeurd."
      keywords="RX medicijnen groothandel, voorschriftplichtige geneesmiddelen distributeur, apotheek leverancier belgie, farmaceutische distributie belgie, FAGG goedgekeurd grossist"
      canonical="/diensten/rx-medicijnen"
      jsonLd={[serviceSchema("RX Medicijnen Groothandel"), faqSchema(FAQ)]}
    />

    <H1>RX Medicijnen Groothandel</H1>
    <Lead>
      Belgomed BV is een FAGG-goedgekeurd grossist en levert voorschriftplichtige geneesmiddelen aan apotheken, ziekenhuizen en zorginstellingen in heel België. Onze farmaceutische distributie verloopt volgens strikte GDP-richtlijnen — van inkoop tot eindlevering.
    </Lead>

    <H2>Wat zijn RX Medicijnen?</H2>
    <P>RX-medicijnen (prescription only) zijn voorschriftplichtige geneesmiddelen die enkel verkrijgbaar zijn op doktersvoorschrift. Deze producten vereisen een hogere graad van controle, traceerbaarheid en koudeketenbeheer dan vrij verkrijgbare geneesmiddelen. Als gespecialiseerde RX medicijnen groothandel garanderen wij compliance op elk niveau van de keten.</P>

    <H2>Onze Werkwijze</H2>
    <DienstFeatureGrid
      eyebrow="End-to-end keten"
      features={[
        { icon: ShieldCheck, title: "GDP-compliance", description: "Gedocumenteerde kwaliteitsprocedures over de volledige distributieketen." },
        { icon: Thermometer, title: "Koudeketenbeheer", description: "Gecontroleerde temperatuur voor koude- en omgevingsproducten, continu gemonitord." },
        { icon: FileCheck2, title: "Batch-traceerbaarheid", description: "Modern ordersysteem met volledige traceerbaarheid op batch- en lotniveau." },
        { icon: Pill, title: "Volledig assortiment", description: "Brede catalogus aan voorschriftplichtige geneesmiddelen, generiek en specialiteiten." },
      ]}
    />

    <H2>Voor wie?</H2>
    <Ul items={[
      "Apotheken — zelfstandig en in samenwerking.",
      "Ziekenhuizen en klinieken in heel België.",
      "Zorginstellingen en woonzorgcentra met eigen apotheekfunctie.",
    ]} />

    <CTA href="#contact">Offerte aanvragen</CTA>
    <ContactForm />
  </PageLayout>
);

export default RxMedicijnen;