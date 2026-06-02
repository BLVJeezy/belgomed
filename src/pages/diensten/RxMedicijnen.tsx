import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Ul, CTA } from "@/components/seo/SeoPageHelpers";

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

    <H2>Wat zijn RX Medicijnen?</H2>
    <P>RX-medicijnen (prescription only) zijn voorschriftplichtige geneesmiddelen die enkel verkrijgbaar zijn op doktersvoorschrift. Deze producten vereisen een hogere graad van controle, traceerbaarheid en koudeketenbeheer dan vrij verkrijgbare geneesmiddelen. Als gespecialiseerde RX medicijnen groothandel garanderen wij compliance op elk niveau van de keten.</P>

    <H2>Onze Werkwijze</H2>
    <Ul items={[
      "Volledige GDP-compliance en gedocumenteerde kwaliteitsprocedures.",
      "Gecontroleerde temperatuurketen voor koude- en omgevingsproducten.",
      "Modern ordersysteem met traceerbaarheid op batch- en lotniveau.",
      "WDA-vergunning en periodieke FAGG-audits.",
      "Pharmacovigilance en directe terugroepprocedures bij meldingen.",
    ]} />

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