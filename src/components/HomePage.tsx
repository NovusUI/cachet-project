import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import CoreValuesSection from "./CoreValuesSection";
import EstatesPricing from "./EstatesPricing";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import WhyChooseUsSection from "./WhyChooseUsSection";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <HeroSection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="why-cachet">
        <WhyChooseUsSection />
      </div>
      <div id="listing">
        <EstatesPricing />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <CoreValuesSection />
      <FooterSection />
    </main>
  );
}
