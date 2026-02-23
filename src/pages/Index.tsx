import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";


import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsCounter />
      
      
      
      <AboutSection />
      <ContactForm />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
