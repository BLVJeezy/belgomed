import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ComplianceBar from "@/components/ComplianceBar";
import ServiceGrid from "@/components/ServiceGrid";
import QualityStatement from "@/components/QualityStatement";
import ColdChainDashboard from "@/components/ColdChainDashboard";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ComplianceBar />
      <ServiceGrid />
      <QualityStatement />
      <ColdChainDashboard />
      <AboutSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
