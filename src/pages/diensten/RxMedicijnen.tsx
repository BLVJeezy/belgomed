import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Ul, CTA } from "@/components/seo/SeoPageHelpers";
import DienstShowcase from "@/components/diensten/DienstShowcase";
import DienstFeatureGrid from "@/components/diensten/DienstFeatureGrid";
import { Pill, ShieldCheck, Thermometer, FileCheck2, Activity, AlertCircle } from "lucide-react";

const RxMedicijnen = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }, { label: "RX Medicijnen" }]}>
    <SEO
      title="RX Medicijnen Groothandel België | Belgomed BV"
      description="Belgomed levert voorschriftplichtige RX-medicijnen aan apotheken en ziekenhuizen in België. GDP-gecertificeerd, snelle levering, FAGG-goedgekeurd."
      keywords="RX medicijnen groothandel, voorschriftplichtige geneesmiddelen distributeur, apotheek leverancier belgie, farmaceutische distributie belgie, FAGG goedgekeurd grossist"
      canonical="/diensten/rx-medicijnen"
    />

    <H1>RX Medicijnen Groothandel</H1>
    <Lead>
      Belgomed BV is een FAGG-goedgekeurd grossist en levert voorschriftplichtige geneesmiddelen aan apotheken, ziekenhuizen en zorginstellingen in heel België. Onze farmaceutische distributie verloopt volgens strikte GDP-richtlijnen — van inkoop tot eindlevering.
    </Lead>

    <DienstShowcase
      code="RX"
      icon={Pill}
      subtitle="Voorschriftplichtige geneesmiddelen"
      title="FAGG-goedgekeurde RX-distributie"
      description="Volledige GDP-keten, gecontroleerde temperatuur en batch-traceerbaarheid voor elke verzending — van centrale apotheek tot ziekenhuisafdeling."
      stats={[
        { value: "FAGG", label: "WDA-vergunning" },
        { value: "GDP", label: "Compliance" },
        { value: "24/7", label: "Pharmacovigilance" },
      ]}
    />

    <H2>Wat zijn RX Medicijnen?</H2>
    <P>RX-medicijnen (prescription only) zijn voorschriftplichtige geneesmiddelen die enkel verkrijgbaar zijn op doktersvoorschrift. Deze producten vereisen een hogere graad van controle, traceerbaarheid en koudeketenbeheer dan vrij verkrijgbare geneesmiddelen. Als gespecialiseerde RX medicijnen groothandel garanderen wij compliance op elk niveau van de keten.</P>

    <H2>Onze Werkwijze</H2>
    <DienstFeatureGrid
      eyebrow="End-to-end keten"
      features={[
        { icon: ShieldCheck, title: "GDP-compliance", description: "Gedocumenteerde kwaliteitsprocedures over de volledige distributieketen." },
        { icon: Thermometer, title: "Koudeketenbeheer", description: "Gecontroleerde temperatuur voor koude- en omgevingsproducten, continu gemonitord." },
        { icon: FileCheck2, title: "Batch-traceerbaarheid", description: "Modern ordersysteem met volledige traceerbaarheid op batch- en lotniveau." },
        { icon: Activity, title: "FAGG-audits", description: "WDA-vergunning en periodieke audits door het Federaal Agentschap voor Geneesmiddelen." },
        { icon: AlertCircle, title: "Pharmacovigilance", description: "Directe terugroepprocedures en meldingsbeheer bij kwaliteitssignalen." },
        { icon: Pill, title: "Volledig assortiment", description: "Brede catalogus aan voorschriftplichtige geneesmiddelen, generiek en specialiteiten." },
      ]}
    />

    <H2>Voor wie?</H2>
    <Ul items={[
      "Apotheken — zelfstandig en in samenwerking.",
      "Ziekenhuizen en klinieken in heel België.",
      "Zorginstellingen en woonzorgcentra met eigen apotheekfunctie.",
    ]} />

    <CTA>Offerte aanvragen</CTA>
  </PageLayout>
);

export default RxMedicijnen;