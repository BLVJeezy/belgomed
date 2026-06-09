import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, CTA, Faq } from "@/components/seo/SeoPageHelpers";
import BelgiumMap from "@/components/regio/BelgiumMap";
import ContactForm from "@/components/ContactForm";
import { audienceServiceSchema, faqSchema } from "@/lib/seoSchemas";

const FAQ = [
  { q: "Belgomed livre-t-il dans toute la Wallonie ?", a: "Oui. Depuis notre centre de distribution, nous desservons le Hainaut, Liège, Namur, le Luxembourg et le Brabant Wallon." },
  { q: "Les livraisons sont-elles disponibles en français ?", a: "Oui. Notre service client et notre documentation sont entièrement disponibles en français pour les pharmacies wallonnes." },
  { q: "Quels sont les délais de livraison standard ?", a: "Les commandes standard sont généralement livrées sous 24-48 heures, avec option urgence en cas de rupture critique." },
];

const provinces = [
  { h: "Grossiste Médical Hainaut / Henegouwen", kw: "fournisseur pharmacie Hainaut", nl: "Belgomed levert farmaceutische producten aan apotheken in Henegouwen — van Mons tot Charleroi en Tournai.", fr: "Belgomed approvisionne les pharmacies du Hainaut — de Mons à Charleroi et Tournai." },
  { h: "Grossiste Médical Liège / Luik", kw: "grossiste medical Liege", nl: "Snelle leveringen voor apotheken en ziekenhuizen in de provincie Luik.", fr: "Livraisons rapides pour les pharmacies et hôpitaux de la province de Liège." },
  { h: "Grossiste Médical Namur / Namen", kw: "distributeur medical Namur", nl: "Farmaceutische distributie aan apotheken en zorginstellingen in de provincie Namen.", fr: "Distribution pharmaceutique aux pharmacies et institutions de soins dans la province de Namur." },
  { h: "Grossiste Médical Luxembourg / Luxemburg", kw: "fournisseur medical Luxembourg belge", nl: "Bediening van apotheken in de Belgische provincie Luxemburg — Arlon, Bastogne, Marche.", fr: "Livraison aux pharmacies de la province de Luxembourg — Arlon, Bastogne, Marche." },
  { h: "Grossiste Médical Brabant Wallon / Waals-Brabant", kw: "apotheek leverancier Waals-Brabant", nl: "Apotheken in Waals-Brabant — Wavre, Nivelles, Ottignies — rekenen op snelle Belgomed-leveringen.", fr: "Les pharmacies du Brabant Wallon — Wavre, Nivelles, Ottignies — comptent sur des livraisons Belgomed rapides." },
];

const Wallonie = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Regio" }, { label: "Wallonie" }]}>
    <SEO
      title="Grossiste Médical Wallonie | Medische Groothandel Wallonië | Belgomed BV"
      description="Belgomed livre des produits médicaux aux pharmacies de toute la Wallonie. Certifié GDP & WDA. Livraison rapide dans toutes les provinces wallonnes."
      keywords="grossiste medical Wallonie, fournisseur pharmacie Wallonie, distributeur medical Belgique, medische groothandel Wallonie"
      canonical="/regio/wallonie"
      ogLocale="fr_BE"
      jsonLd={[audienceServiceSchema("Pharmacies, hôpitaux et institutions de soins en Wallonie"), faqSchema(FAQ)]}
    />

    <H1>Grossiste Médical Wallonie / Medische Groothandel Wallonië</H1>
    <Lead>
      Belgomed BV livre des produits pharmaceutiques aux pharmacies, hôpitaux et institutions de soins dans toute la Wallonie — certifié GDP & WDA.
      <br />
      Belgomed BV levert farmaceutische producten aan apotheken, ziekenhuizen en zorginstellingen in heel Wallonië — GDP & WDA gecertificeerd.
    </Lead>

    <BelgiumMap
      active="wallonie"
      label="Wallonie — 5 provinces"
      sublabel="Hainaut, Liège, Namur, Luxembourg et Brabant Wallon — livraisons rapides certifiées GDP."
    />

    {provinces.map((p) => (
      <div key={p.h}>
        <H2>{p.h}</H2>
        <P>{p.fr}</P>
        <P>{p.nl}</P>
      </div>
    ))}

    <CTA href="#contact">Prenez contact / Neem contact op</CTA>

    <H2>FAQ</H2>
    <Faq items={FAQ} />

    <ContactForm />
  </PageLayout>
);

export default Wallonie;