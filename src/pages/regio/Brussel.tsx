import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import { H1, Lead, H2, P, Ul, CTA } from "@/components/seo/SeoPageHelpers";
import BelgiumMap from "@/components/regio/BelgiumMap";
import ContactForm from "@/components/ContactForm";

const Brussel = () => (
  <PageLayout breadcrumbs={[{ label: "Home", href: "/" }, { label: "Regio" }, { label: "Brussel" }]}>
    <SEO
      title="Medische Groothandel Brussel | Grossiste Médical Bruxelles | Belgomed BV"
      description="Belgomed levert medische producten aan apotheken in Brussel. Grossiste médical certifié GDP pour Bruxelles. Snelle levering, betrouwbare service."
      keywords="medische groothandel Brussel, grossiste medical Bruxelles, apotheek leverancier Brussel, fournisseur pharmacie Bruxelles, farmaceutische distributie Brussel"
      canonical="/regio/brussel"
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

    <CTA>Demandez votre offre / Offerte aanvragen</CTA>
    <ContactForm />
  </PageLayout>
);

export default Brussel;