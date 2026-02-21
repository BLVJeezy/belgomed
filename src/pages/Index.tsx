import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import ComplianceBar from "@/components/ComplianceBar";


import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsCounter />
      <ComplianceBar />
      
      
      
      <AboutSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
