import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CookieConsent from "@/components/CookieConsent";
import { LangProvider } from "@/contexts/LangContext";

const Index = () => {

  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />

          <ProcessSection />
          <FAQSection />
          <ContactForm />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </LangProvider>
  );
};

export default Index;
