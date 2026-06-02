import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Ul, CTA } from "@/components/seo/SeoPageHelpers";

const OtcProducten = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }, { label: "OTC Producten" }]}>
    <SEO
      title="OTC Producten Groothandel België | Belgomed BV"
      description="Groot assortiment OTC-producten voor apotheken in België. Paracetamol, dafalgan, ibuprofen en meer. GDP & WDA gecertificeerd."
      keywords="OTC producten groothandel, paracetamol groothandel belgie, dafalgan leverancier apotheek, ibuprofen groothandel, vrij verkrijgbare geneesmiddelen groothandel"
      canonical="/diensten/otc-producten"
    />

    <H1>OTC Producten Groothandel</H1>
    <Lead>
      Belgomed is uw OTC leverancier voor apotheken en drogisterijen in België. Van paracetamol en dafalgan tot ibuprofen en pantoprazol — wij leveren vrij verkrijgbare geneesmiddelen in groothandelsvolumes, met dezelfde GDP-discipline als onze RX-distributie.
    </Lead>

    <H2>Populaire OTC Producten</H2>
    <Ul items={[
      "Paracetamol — pijnstilling en koortswerend, alle gangbare doseringen.",
      "Dafalgan — merkproduct op basis van paracetamol.",
      "Ibuprofen — ontstekingsremmende pijnstilling.",
      "Amoxicilline — breedspectrum antibioticum (waar van toepassing).",
      "Pantoprazol — maagzuurremmer.",
    ]} />

    <H2>Voordelen van Belgomed als OTC Leverancier</H2>
    <Ul items={[
      "Stabiele beschikbaarheid van populaire merken en generieken.",
      "Concurrentiële prijzen door rechtstreekse contracten.",
      "Snelle leveringen in heel België.",
      "GDP-gecertificeerde behandeling van alle batches.",
    ]} />

    <H2>Voor wie?</H2>
    <Ul items={[
      "Apotheken in Vlaanderen, Wallonië en Brussel.",
      "Drogisterijen en parafarmacie.",
      "Zorginstellingen met eigen verstrekking.",
    ]} />

    <CTA>Offerte aanvragen</CTA>
  </PageLayout>
);

export default OtcProducten;