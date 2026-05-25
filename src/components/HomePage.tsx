import { lazy } from "react";
import HeroSection from "./HeroSection";
import LazySection from "./LazySection";

const AboutSection = lazy(() => import("./AboutSection"));
const ServicesSection = lazy(() => import("./ServicesSection"));
const MissionVisionSection = lazy(() => import("./MissionVisionSection"));
const WhyChooseUsSection = lazy(() => import("./WhyChooseUsSection"));
const EstatesPricing = lazy(() => import("./EstatesPricing"));
const ContactSection = lazy(() => import("./ContactSection"));
const CoreValuesSection = lazy(() => import("./CoreValuesSection"));
const FooterSection = lazy(() => import("./FooterSection"));

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <HeroSection />
      <div id="about" className="scroll-mt-28">
        <LazySection placeholderClassName="min-h-[44rem] bg-[#edf6f1]">
          <AboutSection />
        </LazySection>
      </div>
      <div id="services" className="scroll-mt-28">
        <LazySection placeholderClassName="min-h-[38rem] bg-white">
          <ServicesSection />
        </LazySection>
      </div>
      <LazySection placeholderClassName="min-h-[30rem] bg-white">
        <MissionVisionSection />
      </LazySection>
      <div id="why-cachet" className="scroll-mt-28">
        <LazySection placeholderClassName="min-h-[36rem] bg-[#fbf4ee]">
          <WhyChooseUsSection />
        </LazySection>
      </div>
      <div id="listing" className="scroll-mt-28">
        <LazySection placeholderClassName="min-h-[44rem] bg-white">
          <EstatesPricing />
        </LazySection>
      </div>
      <div id="contact" className="scroll-mt-28">
        <LazySection placeholderClassName="min-h-[40rem] bg-[#fbf4ee]">
          <ContactSection />
        </LazySection>
      </div>
      <LazySection placeholderClassName="min-h-[36rem] bg-white">
        <CoreValuesSection />
      </LazySection>
      <LazySection placeholderClassName="min-h-[28rem] bg-[#343434]">
        <FooterSection />
      </LazySection>
    </main>
  );
}
