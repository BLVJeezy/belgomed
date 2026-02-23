import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/contexts/LangContext";

const ContactForm = () => {
  const { toast } = useToast();
  const { t } = useLang();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "", service: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        bedrijfsnaam: formData.subject || formData.name,
        contact_naam: formData.name.trim().slice(0, 100),
        contact_email: formData.email.trim().slice(0, 255),
        telefoon: formData.phone.trim().slice(0, 20),
        sector: formData.service || "RX",
        service_type: formData.service || null,
        bericht: formData.message.trim().slice(0, 2000),
        land: "België",
        stage: "nieuw" as const,
      });
      if (error) {
        toast({ title: t("contact.error"), description: t("contact.errorDesc"), variant: "destructive" });
      } else {
        toast({ title: t("contact.success"), description: t("contact.successDesc") });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "", service: "" });
      }
    } catch {
      toast({ title: t("contact.error"), description: t("contact.errorConnection"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: "RX", label: t("contact.serviceRx") },
    { value: "OTC", label: t("contact.serviceOtc") },
    { value: "Medical Devices", label: t("contact.serviceMed") },
  ];

  return (
    <section id="contact" className="py-14 md:py-20 px-5 md:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            {t("contact.title")} <span className="gradient-accent-text">{t("contact.titleAccent")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10"><MapPin className="h-5 w-5 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("contact.address")}</h3>
                  <p className="text-sm text-muted-foreground">Trichterheideweg 11<br />3500 Hasselt</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10"><Mail className="h-5 w-5 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("contact.email")}</h3>
                  <p className="text-sm text-muted-foreground">info@belgomed.be</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10"><Phone className="h-5 w-5 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("contact.phone")}</h3>
                  <p className="text-sm text-muted-foreground">+32 (0)11 00 00 00</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-border/30 mt-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.5!2d5.3387!3d50.9307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c121c0f0f0f0f0%3A0x0!2sTrichterheideweg%2011%2C%203500%20Hasselt!5e0!3m2!1snl!2sbe!4v1700000000000"
                width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Belgomed locatie"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.name")}</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.namePlaceholder")} required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.emailLabel")}</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("contact.emailPlaceholder")} required maxLength={255} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("contact.phoneLabel")}</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t("contact.phonePlaceholder")} maxLength={20} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">{t("contact.productGroup")}</Label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">{t("contact.selectType")}</option>
                    {serviceOptions.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t("contact.subject")}</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={t("contact.subjectPlaceholder")} required maxLength={150} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.message")}</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t("contact.messagePlaceholder")} rows={5} required maxLength={2000} />
              </div>
              <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>
                <Send className="h-4 w-4" />
                {isSubmitting ? t("contact.submitting") : t("contact.submit")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
