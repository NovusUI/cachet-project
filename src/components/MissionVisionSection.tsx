import { motion } from "framer-motion";

type Pillar = {
  key: "mission" | "vision";
  number: string;
  title: string;
  letter: string;
  description: string;
  tone: "purple" | "orange";
};

const pillars: Pillar[] = [
  {
    key: "mission",
    number: "01",
    title: "Our Mission",
    letter: "M",
    tone: "purple",
    description:
      "To deliver exceptional real estate services through quality properties, professional management, and customer satisfaction, ensuring every client experiences excellence in every deal.",
  },
  {
    key: "vision",
    number: "02",
    title: "Our Vision",
    letter: "V",
    tone: "orange",
    description:
      "To become Africa's top real estate brand, known for excellence, integrity, and innovation.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function getCardStyles(tone: Pillar["tone"]) {
  if (tone === "purple") {
    return {
      shell: "bg-[#f5eef9] ring-1 ring-[#5C2E83]/10",
      number: "text-[#5C2E83]",
      letter: "text-[#5C2E83]/10",
      accent: "bg-[#5C2E83]",
      title: "text-[#241c2d]",
      body: "text-[#463b51]/88",
    };
  }

  return {
    shell: "bg-[#fdf2e8] ring-1 ring-[#db7a33]/12",
    number: "text-[#db7a33]",
    letter: "text-[#db7a33]/12",
    accent: "bg-[#db7a33]",
    title: "text-[#2f241e]",
    body: "text-[#5a4a40]/88",
  };
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  const styles = getCardStyles(pillar.tone);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
      className={`group relative overflow-hidden rounded-[1.75rem] p-7 shadow-[0_20px_48px_rgba(20,16,28,0.06)] transition-transform duration-300 sm:p-8 ${styles.shell}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-4 right-5 font-bold leading-none ${styles.letter}`}
        style={{ fontSize: "clamp(5rem, 12vw, 7.5rem)" }}
      >
        {pillar.letter}
      </span>

      <div className={`mb-7 h-1.5 w-14 rounded-full ${styles.accent}`} />

      <div className="relative z-10 max-w-md">
        <p className={`text-[0.78rem] font-semibold tracking-[0.22em] ${styles.number}`}>
          {pillar.number}
        </p>
        <h3 className={`mt-3 text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[1.7rem] ${styles.title}`}>
          {pillar.title}
        </h3>
        <p className={`mt-5 text-[1rem] leading-8 sm:text-[1.04rem] ${styles.body}`}>
          {pillar.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function MissionVisionSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-18 md:px-10 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute top-[-5rem] left-[-4rem] h-56 w-56 rounded-full bg-[#eddff6]/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-4rem] bottom-[-4rem] h-64 w-64 rounded-full bg-[#fae4d0]/45 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.08fr)] lg:items-start lg:gap-16 xl:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-28"
        >
          <p className="text-[0.72rem] font-bold tracking-[0.22em] text-[#db7a33]">
            MISSION & VISION
          </p>

          <h2 className="mt-5 max-w-lg text-[2.2rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#222222] sm:text-[2.8rem] lg:text-[3.15rem]">
            Clear direction for every <span className="text-[#5C2E83]">property move.</span>
          </h2>

          <div className="mt-5 h-px w-18 bg-[#db7a33]/55" />

          <p className="mt-5 max-w-md text-[1rem] leading-8 text-[#403848]/84 sm:text-[1.05rem]">
            Everything we do is anchored in purposeful service, long-term value,
            and a standard of professionalism clients can rely on.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          className="grid gap-5"
        >
          {pillars.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
