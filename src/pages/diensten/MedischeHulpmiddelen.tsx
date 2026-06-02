import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Ul, CTA } from "@/components/seo/SeoPageHelpers";
import DienstFeatureGrid from "@/components/diensten/DienstFeatureGrid";
import { Stethoscope, Syringe, Bandage, ShieldCheck, ScanSearch, HeartPulse } from "lucide-react";

const MedischeHulpmiddelen = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diensten" }, { label: "Medische Hulpmiddelen" }]}>
    <SEO
      title="Medische Hulpmiddelen Groothandel België | Belgomed BV"
      description="Belgomed distribueert medische hulpmiddelen aan zorginstellingen in heel België. Groot assortiment, snelle levering, GDP & WDA gecertificeerd."
      keywords="medische hulpmiddelen groothandel, distributeur medische hulpmiddelen belgie, groothandel medische materialen, medisch materiaal bestellen groot, zorginstellingen leverancier"
      canonical="/diensten/medische-hulpmiddelen"
    />

    <H1>Medische Hulpmiddelen Groothandel</H1>
    <Lead>
      Als distributeur medische hulpmiddelen in België levert Belgomed verbruiksmaterialen en disposables aan apotheken, ziekenhuizen en woonzorgcentra. Ons aanbod sluit aan op de dagelijkse behoeften van zorgprofessionals — met dezelfde betrouwbaarheid als onze farmaceutische distributie.
    </Lead>

    <H2>Ons Assortiment Medische Hulpmiddelen</H2>
    <P>Belgomed stelt een breed assortiment medische materialen samen, afgestemd op de zorgomgeving van de klant: verbandmateriaal, injectiemateriaal, diagnostische hulpmiddelen, persoonlijke beschermingsmiddelen en aanverwante disposables.</P>

    <DienstFeatureGrid
      eyebrow="Productcategorieën"
      features={[
        { icon: Bandage, title: "Verbandmateriaal", description: "Steriele kompressen, pleisters, zwachtels en wondverzorging." },
        { icon: Syringe, title: "Injectiemateriaal", description: "Spuiten, naalden en bijhorende disposables in alle gangbare maten." },
        { icon: ScanSearch, title: "Diagnostische hulpmiddelen", description: "Thermometers, bloeddrukmeters, testen en monitoring." },
        { icon: ShieldCheck, title: "PBM", description: "Persoonlijke beschermingsmiddelen — handschoenen, maskers, schorten." },
        { icon: HeartPulse, title: "Zorgdisposables", description: "Verbruiksmateriaal voor woonzorg, thuiszorg en eerstelijnspraktijken." },
        { icon: Stethoscope, title: "Praktijkbenodigdheden", description: "Aanvullende materialen voor de dagelijkse zorgomgeving." },
      ]}
    />

    <H2>Kwaliteit & Certificering</H2>
    <Ul items={[
      "WDA-vergunning van het FAGG voor farmaceutische distributie.",
      "GDP-richtlijnen toegepast over het volledige assortiment.",
      "Werken uitsluitend met CE-gemarkeerde medische hulpmiddelen.",
      "Traceerbaarheid en batchregistratie voor terugroepvermogen.",
    ]} />

    <H2>Voor wie?</H2>
    <Ul items={[
      "Apotheken met groothandelsbehoefte aan medisch materiaal.",
      "Ziekenhuizen, klinieken en eerstelijnszorg.",
      "Woonzorgcentra en thuiszorgorganisaties.",
    ]} />

    <CTA>Offerte aanvragen</CTA>
  </PageLayout>
);

export default MedischeHulpmiddelen;