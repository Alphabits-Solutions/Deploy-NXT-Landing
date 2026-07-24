import { useState } from "react";
import { convertGoogleDriveLink } from "./utils/googleDrive";
import { useActiveSection } from "./hooks/useActiveSection";
// import { FloatingNav } from "./components/layout/FloatingNav";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { SupportersSection } from "./components/sections/SupportersSection";
import { ProductsSection } from "./components/sections/ProductsSection";
import { TeamSection } from "./components/sections/TeamSection";
import { CareersSection } from "./components/sections/CareersSection";
import { BlogSection } from "./components/sections/BlogSection";
import { ContactSection, EMPTY_CONTACT_FORM } from "./components/sections/ContactSection";
import { GDriveWorkspace } from "./components/GDriveWorkspace";
import type { ContactFormData } from "./types";

export default function App() {
  const { activeSection, scrollToSection } = useActiveSection();

  // Custom Google Drive asset links (State driven, allowing users to test live!)
  const [logoLink, setLogoLink] = useState(""); // User can enter any Google Drive link
  const [prodImgLinks, setProdImgLinks] = useState<Record<string, string>>({
    "vyom-2u": "",
    "ibooster": "",
    "thruster-array": ""
  });

  // General Contact Form state (lifted so Products/Careers can prefill it)
  const [contactForm, setContactForm] = useState<ContactFormData>(EMPTY_CONTACT_FORM);

  // Auto-set contact product when clicked "Contact us for more"
  const handleProductContact = (productId: string, productName: string) => {
    setContactForm(prev => ({
      ...prev,
      interest: productId,
      message: `Hi team, I would like to request detailed technical documentation and a commercial quote for the ${productName}. Please get back to us.`
    }));
    scrollToSection("contact");
  };

  // Prefill the contact form for an open speculative career application
  const handleSpeculativePitch = () => {
    setContactForm(prev => ({
      ...prev,
      interest: "careers",
      message: "Hi, I am interested in open applications at DeployNXT. My specialty is [Describe Specialty]."
    }));
    scrollToSection("contact");
  };

  // Generate resolved image urls (converting Google Drive links if provided)
  const resolvedLogo = logoLink ? convertGoogleDriveLink(logoLink) : null;
  const resolvedProdImgs: Record<string, string | null> = Object.fromEntries(
    Object.entries(prodImgLinks).map(([id, link]) => [id, link ? convertGoogleDriveLink(link) : null])
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white relative">

      {/* <FloatingNav activeSection={activeSection} onNavigate={scrollToSection} /> */}
      <Header activeSection={activeSection} onNavigate={scrollToSection} resolvedLogo={resolvedLogo} />

      <HeroSection onNavigate={scrollToSection} />
      <ProductsSection resolvedProdImgs={resolvedProdImgs} onProductContact={handleProductContact} />
      <SupportersSection />
      <TeamSection onNavigate={scrollToSection} />
      <CareersSection onSpeculativePitch={handleSpeculativePitch} />
      <BlogSection />
      <ContactSection contactForm={contactForm} setContactForm={setContactForm} />

      <GDriveWorkspace
        onSave={(logo, prodLinks) => {
          setLogoLink(logo);
          setProdImgLinks(prodLinks);
        }}
      />

      <Footer onNavigate={scrollToSection} />

    </div>
  );
}
