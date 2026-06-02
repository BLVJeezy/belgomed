import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, H3, P, CardGrid, Faq, CTA } from "@/components/seo/SeoPageHelpers";

const Zoekwoorden = () => {
  const faq = [
    { q: "Wat is een medische groothandel?", a: "Een medische groothandel is een GDP-gecertificeerde distributeur die geneesmiddelen, OTC-producten en medische hulpmiddelen levert aan apotheken, ziekenhuizen en zorginstellingen. Belgomed BV verzorgt deze rol voor heel België." },
    { q: "Levert Belgomed aan apotheken in heel België?", a: "Ja. Belgomed levert aan apotheken, ziekenhuizen en zorginstellingen in Vlaanderen, Wallonië en het Brussels Hoofdstedelijk Gewest. Onze logistiek is afgestemd op snelle nationale distributie." },
    { q: "Wat is het verschil tussen RX en OTC?", a: "RX-producten (prescription) zijn voorschriftplichtige geneesmiddelen die enkel via een doktersvoorschrift verkrijgbaar zijn. OTC (over-the-counter) zijn vrij verkrijgbare geneesmiddelen zoals paracetamol, dafalgan en ibuprofen." },
    { q: "Is Belgomed GDP gecertificeerd?", a: "Ja. Belgomed BV beschikt over de WDA-vergunning (Wholesale Distribution Authorisation) van het FAGG en werkt volledig volgens de Europese GDP-richtlijnen (Good Distribution Practice)." },
    { q: "Hoe bestel ik medisch materiaal in groot?", a: "Apotheken en zorginstellingen kunnen via ons contactformulier een offerte aanvragen. We bespreken assortiment, volumes en leveringsfrequentie op maat van uw organisatie." },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Zoekwoorden" }]}>
      <SEO
        title="Medische Groothandel België — Zoekwoorden Overzicht | Belgomed BV"
        description="Belgomed BV is de medische groothandel voor apotheken in België. Ontdek ons aanbod: RX, OTC, hulpmiddelen. GDP & WDA gecertificeerd."
        keywords="groothandel medische artikelen apothekers belgie, medische groothandel, medicijnen groothandel, distributeur medische hulpmiddelen, paracetamol groothandel, GDP gecertificeerd"
        canonical="/zoekwoorden"
        jsonLd={jsonLd}
      />

      <H1>Medische Groothandel België | Belgomed BV</H1>
      <Lead>
        Belgomed BV is een onafhankelijke medische groothandel in België met een volledige WDA-vergunning en GDP-certificering. Wij bedienen apotheken, ziekenhuizen en zorginstellingen met RX-medicijnen, OTC-producten en medische hulpmiddelen. Onze farmaceutische distributie is gebouwd op betrouwbaarheid, snelle levering en strikte kwaliteitscontrole.
      </Lead>

      <H2>Onze Productcategorieën</H2>
      <H3>RX Medicijnen Groothandel</H3>
      <P>Voorschriftplichtige geneesmiddelen voor apotheken en ziekenhuizen — volledig onder GDP-toezicht. <a href="/diensten/rx-medicijnen" className="text-primary hover:underline">Bekijk ons RX-aanbod →</a></P>
      <H3>OTC Producten Groothandel</H3>
      <P>Vrij verkrijgbare geneesmiddelen zoals paracetamol, dafalgan en ibuprofen, in groothandelsvolumes. <a href="/diensten/otc-producten" className="text-primary hover:underline">Bekijk ons OTC-aanbod →</a></P>
      <H3>Medische Hulpmiddelen Groothandel</H3>
      <P>Distributeur medische hulpmiddelen voor zorginstellingen, woonzorgcentra en eerstelijnszorg. <a href="/diensten/medische-hulpmiddelen" className="text-primary hover:underline">Bekijk medische hulpmiddelen →</a></P>

      <H2>Populaire Producten</H2>
      <P>Veelgevraagde groothandelsproducten in onze catalogus: <strong className="text-foreground">paracetamol</strong>, <strong className="text-foreground">dafalgan</strong>, <strong className="text-foreground">ibuprofen</strong>, <strong className="text-foreground">amoxicilline</strong> en <strong className="text-foreground">pantoprazol</strong>. Alle producten worden geleverd onder strikte temperatuur- en kwaliteitscontrole volgens GDP-richtlijnen.</P>

      <H2>Wij Leveren in Heel België</H2>
      <CardGrid
        cards={[
          { title: "Vlaanderen", description: "Antwerpen, Oost-Vlaanderen, West-Vlaanderen, Vlaams-Brabant en Limburg.", href: "/regio/vlaanderen" },
          { title: "Wallonië", description: "Hainaut, Liège, Namur, Luxembourg en Brabant Wallon.", href: "/regio/wallonie" },
          { title: "Brussel", description: "Brussels Hoofdstedelijk Gewest — tweetalige service NL/FR.", href: "/regio/brussel" },
        ]}
      />

      <H2>Veelgestelde Vragen</H2>
      <Faq items={faq} />

      <CTA>Vraag uw offerte aan</CTA>
    </PageLayout>
  );
};

export default Zoekwoorden;