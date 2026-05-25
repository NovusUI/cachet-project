import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function scrollToSection(sectionId: "listing" | "contact") {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const CursorPointer = () => (
  <svg
    width="24"
    height="36"
    viewBox="0 0 24 36"
    fill="none"
    style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.4))" }}
  >
    <path
      d="M2 2L10.5 28L14.5 19L22 19L2 2Z"
      fill="white"
      stroke="#000"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HeroSection() {
  const [hasLineAnimation, setHasLineAnimation] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (event: MediaQueryListEvent) => {
      setHasLineAnimation(event.matches);
    };

    setHasLineAnimation(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const contentStart = hasLineAnimation ? 2.0 : 0;

  return (
    <section className="overflow-hidden bg-gray-900 font-sans">
      <div className="relative w-full" style={{ minHeight: "100svh" }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          <motion.div
            className="absolute border border-dashed border-white/50"
            style={{ top: "96px", left: "48px" }}
            initial={{ width: "calc(0% + 0px)", height: "calc(0% + 0px)", opacity: 0 }}
            animate={{
              width: [
                "calc(0% + 0px)",
                "calc(83% + -48px)",
                "calc(83% + -48px)",
                "calc(83% + -48px)",
              ],
              height: [
                "calc(0% + 0px)",
                "calc(100% + -144px)",
                "calc(100% + -144px)",
                "calc(100% + -144px)",
              ],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.45, 0.8, 1],
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute z-50"
            style={{ marginLeft: "-2px", marginTop: "-2px" }}
            initial={{ left: "calc(0% + 48px)", top: "calc(0% + 96px)", opacity: 0 }}
            animate={{
              left: [
                "calc(0% + 48px)",
                "calc(83% + 0px)",
                "calc(83% + 0px)",
                "calc(83% + 0px)",
              ],
              top: [
                "calc(0% + 96px)",
                "calc(100% + -48px)",
                "calc(100% + -48px)",
                "calc(100% + -48px)",
              ],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.45, 0.8, 1],
              ease: "easeInOut",
            }}
          >
            <CursorPointer />
          </motion.div>

          <motion.div
            className="absolute top-0 bottom-0"
            style={{
              right: "17%",
              width: "1px",
              backgroundColor: "rgba(255,255,255,0.25)",
              transformOrigin: "50% calc(100% - 48px)",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          />

          <motion.div
            className="absolute right-0 left-0"
            style={{
              bottom: "48px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.25)",
              transformOrigin: "calc(100% - 17%) 50%",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          />
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 pt-28 pb-16 md:px-12 md:pt-32 md:pb-20 lg:px-16">
          <div className="relative max-w-full w-fit p-5 -mt-5 -ml-5 sm:max-w-5xl sm:p-10 sm:-mt-10 sm:-ml-10">
            <div className="relative z-10">
              {[
                { text: "PREMIUM", size: "clamp(3rem, 9vw, 6.5rem)", delay: contentStart },
                { text: "REAL ESTATE.", size: "clamp(3rem, 9vw, 6.5rem)", delay: contentStart + 0.12 },
                { text: "UNCOMPROMISED.", size: "clamp(2.2rem, 7.5vw, 6.5rem)", delay: contentStart + 0.24 },
              ].map(({ text, size, delay }) => (
                <div key={text} style={{ overflow: "hidden" }}>
                  <motion.h1
                    className="text-white font-light leading-none"
                    style={{
                      fontSize: size,
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                      fontWeight: 300,
                    }}
                    initial={{ x: -20, opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
                    animate={{ x: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay,
                    }}
                  >
                    {text}
                  </motion.h1>
                </div>
              ))}

              <motion.p
                className="mt-8 mb-8 max-w-sm text-white/65 md:mt-12 md:mb-10 md:max-w-md"
                style={{
                  fontSize: "clamp(0.8rem, 1.5vw, 0.875rem)",
                  lineHeight: 1.75,
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: contentStart + 0.45,
                }}
              >
                Cachet Realtors Limited is a dynamic real estate startup, specializing in premium land and 
                property solution with an emphasis on excellence, transparency, and customer satisfaction.
              </motion.p>

              <motion.div
                className="flex flex-row items-center gap-3 sm:gap-4"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: contentStart + 0.6,
                }}
              >
                <button
                  type="button"
                  onClick={() => scrollToSection("listing")}
                  className="px-7 py-3.5 text-xs font-bold tracking-widest text-white transition-all duration-200 hover:brightness-110 active:scale-95 md:px-8"
                  style={{ backgroundColor: "#D4651A", letterSpacing: "0.15em" }}
                >
                  VIEW LISTING
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="border border-white px-7 py-3.5 text-xs font-bold tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-95 md:px-8"
                  style={{ letterSpacing: "0.15em" }}
                >
                  GET STARTED
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
