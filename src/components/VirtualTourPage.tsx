import { motion } from "framer-motion";

type VirtualTourPageProps = {
  onGoHome: () => void;
};

const virtualTourEmbedUrl =
  "https://player.vimeo.com/video/854916741?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0";

export default function VirtualTourPage({ onGoHome }: VirtualTourPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0c0b10] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800&auto=format&fit=crop&q=80')",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <iframe
          title="Cachet virtual tour preview"
          src={virtualTourEmbedUrl}
          allow="autoplay; fullscreen; picture-in-picture"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.08]"
        />
      </div>

      <div className="absolute inset-0 bg-black/58" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/52 via-black/38 to-black/66" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-28 pb-16 text-center md:px-10 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[0.76rem] font-semibold tracking-[0.24em] text-[#db7a33]"
        >
          VIRTUAL TOUR
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-[3rem] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[4.6rem] lg:text-[5.6rem]"
        >
          COMING SOON
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-[1rem] leading-8 text-white/72 sm:text-[1.08rem]"
        >
          Immersive Cachet property walkthroughs are on the way. Soon, you’ll be
          able to explore our spaces remotely with a premium guided experience.
        </motion.p>

        <motion.button
          type="button"
          onClick={onGoHome}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3, boxShadow: "0 18px 34px rgba(212,101,26,0.18)" }}
          whileTap={{ scale: 0.985 }}
          className="mt-12 inline-flex items-center gap-4 rounded-full bg-[#a8622f]/86 px-8 py-4 text-[1.05rem] font-medium text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors duration-200 hover:bg-[#b06a37]"
        >
          <span>Go Home</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5.5 12H18.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M13 6.5L18.5 12L13 17.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </section>
    </main>
  );
}
