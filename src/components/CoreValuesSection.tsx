import { motion } from "framer-motion";
import { useHoverSupport } from "../hooks/useHoverSupport";

type CoreValue = {
  key: string;
  letter: string;
  title: string;
  description: string;
  baseColor: "purple" | "orange";
};

const coreValues: CoreValue[] = [
  {
    key: "customer-satisfaction",
    letter: "C",
    title: "Customer Satisfaction",
    baseColor: "purple",
    description:
      "We put our clients first, shaping every interaction around clarity, comfort, responsiveness, and meaningful results.",
  },
  {
    key: "accountability",
    letter: "A",
    title: "Accountability",
    baseColor: "orange",
    description:
      "We own our promises, communicate openly, and stay responsible for the details that move every project forward.",
  },
  {
    key: "commitment",
    letter: "C",
    title: "Commitment",
    baseColor: "purple",
    description:
      "We stay dedicated to quality service, thoughtful execution, and relationships that stand the test of time.",
  },
  {
    key: "honesty",
    letter: "H",
    title: "Honesty",
    baseColor: "orange",
    description:
      "We lead with truth, offer practical guidance, and build confidence through transparent conversations and actions.",
  },
  {
    key: "excellence",
    letter: "E",
    title: "Excellence",
    baseColor: "purple",
    description:
      "We pursue high standards in presentation, delivery, and the fine details that define exceptional real estate service.",
  },
  {
    key: "trustworthiness",
    letter: "T",
    title: "Trustworthiness",
    baseColor: "orange",
    description:
      "We earn trust through consistency, discretion, dependable follow-through, and a strong sense of professional care.",
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

const itemVariants = {
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

function getColorClasses(baseColor: CoreValue["baseColor"], hasHover: boolean) {
  if (baseColor === "purple") {
    return {
      wrapper: hasHover
        ? "bg-[#5C2E83] text-white hover:bg-[#f4edf8]"
        : "bg-[#f4edf8] text-[#5C2E83]",
      letter: hasHover
        ? "text-white/10 group-hover:text-[#5C2E83]/16"
        : "text-[#5C2E83]/16",
      title: hasHover
        ? "text-white group-hover:text-[#5C2E83]"
        : "text-[#5C2E83]",
      body: hasHover
        ? "text-black"
        : "text-[#33273b]",
      outline: hasHover ? "" : "ring-1 ring-[#5C2E83]/8",
    };
  }

  return {
    wrapper: hasHover
      ? "bg-[#db7a33] text-white hover:bg-[#fdf0e4]"
      : "bg-[#fdf0e4] text-[#db7a33]",
    letter: hasHover
      ? "text-white/10 group-hover:text-[#db7a33]/16"
      : "text-[#db7a33]/18",
    title: hasHover
      ? "text-white group-hover:text-[#db7a33]"
      : "text-[#db7a33]",
    body: hasHover
      ? "text-black"
      : "text-[#3a2a20]",
    outline: hasHover ? "" : "ring-1 ring-[#db7a33]/8",
  };
}

function ValueCard({ value }: { value: CoreValue }) {
  const hasHover = useHoverSupport();
  const colors = getColorClasses(value.baseColor, hasHover);

  return (
    <motion.article
      variants={itemVariants}
      whileHover={
        hasHover
          ? { y: -6, transition: { duration: 0.24, ease: "easeOut" } }
          : undefined
      }
      className={`group relative min-h-[18rem] overflow-hidden rounded-[1.6rem] p-6 transition-all duration-500 sm:min-h-[19rem] sm:p-7 ${colors.wrapper} ${colors.outline}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute font-bold leading-none transition-all duration-500 ${colors.letter} ${
          hasHover
            ? "text-[36rem] -bottom-24 -left-8 group-hover:left-6 group-hover:top-6 group-hover:bottom-auto group-hover:text-[4.5rem]"
            : "left-6 top-6 text-[4.5rem]"
        }`}
      >
        {value.letter}
      </span>

      <div className="absolute top-6 right-6 z-10 text-right">
        {value.title.split(" ").map((word, index) => (
          <h3
            key={`${value.key}-${index}`}
            className={`text-[1rem] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-500 sm:text-[1.08rem] ${colors.title}`}
          >
            {word}
          </h3>
        ))}
      </div>

      <p
        className={`absolute left-6 right-6 bottom-6 z-10 text-[0.94rem] leading-7 transition-all duration-500 sm:text-[0.98rem] ${colors.body} ${
          hasHover
            ? "translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            : "translate-y-0 opacity-100"
        }`}
      >
        {value.description}
      </p>
    </motion.article>
  );
}

export default function CoreValuesSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-18 md:px-10 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute top-14 left-[-7rem] h-56 w-56 rounded-full bg-[#f4dcc9]/35 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] bottom-4 h-72 w-72 rounded-full bg-[#e0d0ea]/35 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#db7a33]">
            Our Core Values - CACHET
          </p>

        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {coreValues.map((value) => (
            <ValueCard key={value.key} value={value} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
