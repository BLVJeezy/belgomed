import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Ul, CTA, Faq } from "@/components/seo/SeoPageHelpers";
import BelgiumMap from "@/components/regio/BelgiumMap";
import ContactForm from "@/components/ContactForm";
import { audienceServiceSchema, faqSchema } from "@/lib/seoSchemas";

const FAQ = [
  { q: "Levert Belgomed in alle 19 Brusselse gemeenten? / Belgomed livre-t-il dans les 19 communes ?", a: "Ja, wij verzorgen leveringen in heel het Brussels Hoofdstedelijk Gewest. Oui, nous livrons dans l'ensemble de la Région de Bruxelles-Capitale." },
  { q: "Is de service tweetalig? / Le service est-il bilingue ?", a: "Ja, klantendienst en documentatie zijn beschikbaar in NL en FR. Oui, le service client et la documentation sont disponibles en NL et FR." },
  { q: "Hoe snel verloopt een spoedlevering in Brussel? / Quel est le délai d'une livraison urgente ?", a: "Spoedleveringen in Brussel kunnen doorgaans dezelfde dag verzorgd worden. Les livraisons urgentes peuvent généralement être effectuées le jour même." },
];

const Brussel = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Regio" }, { label: "Brussel" }]}>
    <SEO
      title="Medische Groothandel Brussel | Grossiste Médical Bruxelles | Belgomed BV"
      description="Belgomed levert medische producten aan apotheken in Brussel. Grossiste médical certifié GDP pour Bruxelles. Snelle levering, betrouwbare service."
      keywords="medische groothandel Brussel, grossiste medical Bruxelles, apotheek leverancier Brussel, fournisseur pharmacie Bruxelles, farmaceutische distributie Brussel"
      canonical="/regio/brussel"
      jsonLd={[audienceServiceSchema("Apothéquaires, hôpitaux en zorginstellingen in Brussel / Bruxelles"), faqSchema(FAQ)]}
    />

    <H1>Medische Groothandel Brussel / Grossiste Médical Bruxelles</H1>
    <Lead>
      Belgomed BV bedient apotheken, ziekenhuizen en zorginstellingen in het Brussels Hoofdstedelijk Gewest — tweetalig en GDP-gecertificeerd.
      <br />
      Belgomed BV approvisionne les pharmacies, hôpitaux et institutions de soins de la Région de Bruxelles-Capitale — bilingue et certifié GDP.
    </Lead>

    <BelgiumMap
      active="brussel"
      label="Brussel-Hoofdstad / Bruxelles-Capitale"
      sublabel="Distribution dans les 19 communes — bilingue NL/FR. Levering in de 19 gemeenten — tweetalig."
    />

    <H2>Levering in het Brussels Hoofdstedelijk Gewest / Livraison Bruxelles-Capitale</H2>
    <P>Snelle distributie binnen de 19 gemeenten van Brussel, met aandacht voor de logistieke uitdagingen van de hoofdstad. Livraisons rapides dans les 19 communes de Bruxelles, adaptées aux contraintes logistiques de la capitale.</P>

    <H2>GDP & WDA Gecertificeerd / Certifié GDP & WDA</H2>
    <P>Belgomed beschikt over een volledige WDA-vergunning van het FAGG en werkt volgens de Europese GDP-richtlijnen. Belgomed dispose d'une autorisation WDA complète de l'AFMPS et applique les directives GDP européennes.</P>

    <H2>Voor wie? / Pour qui?</H2>
    <Ul items={[
      "Apotheken in Brussel / Pharmacies à Bruxelles.",
      "Ziekenhuizen en klinieken / Hôpitaux et cliniques.",
      "Zorginstellingen en woonzorgcentra / Institutions de soins et maisons de repos.",
    ]} />

    <CTA href="#contact">Demandez votre offre / Offerte aanvragen</CTA>

    <H2>FAQ</H2>
    <Faq items={FAQ} />

    <ContactForm />
  </PageLayout>
);

export default Brussel;