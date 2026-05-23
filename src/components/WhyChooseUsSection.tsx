import { motion } from "framer-motion";

function scrollToContactSection() {
  document.getElementById("contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

type Feature = {
  title: string;
  description: string;
  icon: "tech" | "calendar" | "globe" | "heart";
};

const features: Feature[] = [
  {
    title: "Tech-Driven Services",
    description:
      "We leverage advanced tech, like immersive virtual tours, to let you explore properties seamlessly from anywhere.",
    icon: "tech",
  },
  {
    title: "Flexible Payment Plans",
    description:
      "We offer customizable, milestone-based payment structures tailored to fit your budget and financial goals.",
    icon: "calendar",
  },
  {
    title: "Commitment to Sustainability",
    description:
      "Our projects prioritize eco-friendly materials and energy-efficient designs to reduce environmental impact.",
    icon: "globe",
  },
  {
    title: "Passion for Property",
    description:
      "Real estate isn't just our business, it's what we're genuinely passionate about.",
    icon: "heart",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function FeatureIcon({ icon }: { icon: Feature["icon"] }) {
  const commonProps = {
    stroke: "#5C2E83",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  if (icon === "calendar") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="5.5" width="15" height="14" rx="2.5" {...commonProps} />
        <path d="M8 3.75V7" {...commonProps} />
        <path d="M16 3.75V7" {...commonProps} />
        <path d="M4.5 9.5H19.5" {...commonProps} />
        <path d="M8.25 13H10.25" {...commonProps} />
        <path d="M12 13H14" {...commonProps} />
        <path d="M8.25 16H10.25" {...commonProps} />
      </svg>
    );
  }

  if (icon === "globe") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" {...commonProps} />
        <path d="M4.5 12H19.5" {...commonProps} />
        <path d="M12 4C14.2 6.2 15.45 9 15.45 12C15.45 15 14.2 17.8 12 20" {...commonProps} />
        <path d="M12 4C9.8 6.2 8.55 9 8.55 12C8.55 15 9.8 17.8 12 20" {...commonProps} />
      </svg>
    );
  }

  if (icon === "heart") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 19.4L10.8 18.3C6.55 14.5 4 12.2 4 9.35C4 7.05 5.8 5.25 8.1 5.25C9.4 5.25 10.65 5.85 11.45 6.85L12 7.55L12.55 6.85C13.35 5.85 14.6 5.25 15.9 5.25C18.2 5.25 20 7.05 20 9.35C20 12.2 17.45 14.5 13.2 18.3L12 19.4Z"
          {...commonProps}
        />
      </svg>
    );
  }

  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="12,4.5 17.8,7.75 17.8,14.25 12,17.5 6.2,14.25 6.2,7.75" {...commonProps} />
      <circle cx="12" cy="4.5" r="1.5" {...commonProps} />
      <circle cx="17.8" cy="7.75" r="1.5" {...commonProps} />
      <circle cx="17.8" cy="14.25" r="1.5" {...commonProps} />
      <circle cx="12" cy="17.5" r="1.5" {...commonProps} />
      <circle cx="6.2" cy="14.25" r="1.5" {...commonProps} />
      <circle cx="6.2" cy="7.75" r="1.5" {...commonProps} />
    </svg>
  );
}

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ x: 10, transition: { duration: 0.28, ease: "easeOut" } }}
      className="group relative overflow-hidden border-t border-[#7a56a3]/60 py-7 first:pt-7 last:border-b last:pb-7 md:py-8 md:first:pt-8 md:last:pb-8"
    >
      <motion.div
        className="absolute inset-y-4 left-0 w-24 rounded-full bg-gradient-to-r from-[#5C2E83]/7 to-transparent opacity-0 blur-2xl transition-opacity duration-300"
        initial={false}
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <motion.div
          initial={{ scale: 0.92, opacity: 0.85 }}
          whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 4 : -4 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d7c6db]/75 shadow-[0_10px_30px_rgba(92,46,131,0.08)]"
        >
          <FeatureIcon icon={feature.icon} />
        </motion.div>

        <div className="max-w-xl">
          <h3 className="text-[1.08rem] font-semibold leading-tight text-[#111111] sm:text-[1.18rem] lg:text-[1.28rem]">
            {feature.title}
          </h3>
          <p className="mt-2 text-[0.9rem] leading-[1.7] text-[#2f2a32]/85 sm:text-[0.94rem] sm:leading-7">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbf4ee] px-6 py-18 md:px-10 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute top-12 left-[-7rem] h-56 w-56 rounded-full bg-[#e7d5c8]/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] bottom-8 h-72 w-72 rounded-full bg-[#d8cae4]/35 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.08fr)] lg:gap-24 xl:gap-28">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center self-center"
        >
          <span className="mb-5 text-[0.68rem] font-bold tracking-[0.24em] text-[#db7a33]">
            WHY CHOOSE US
          </span>

          <h2 className="max-w-xl text-[2.15rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#4c2776] sm:text-[2.85rem] lg:text-[2.5rem] xl:text-[3rem]">
            The <span className="text-[#db7a33]">Cachet</span> Difference
          </h2>

          <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#2c2630] sm:text-[1.12rem] sm:leading-8">
            In a market where trust is earned, not given, Cachet Realtors stands
            apart through an uncompromising dedication to professionalism and
            results.
          </p>

          <motion.button
            type="button"
            onClick={scrollToContactSection}
            whileHover={{ y: -3, boxShadow: "0 18px 30px rgba(92, 46, 131, 0.18)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-9 inline-flex self-start items-center justify-center bg-[#5C2E83] px-8 py-4 text-sm font-medium tracking-[0.2em] text-white sm:min-w-[244px]"
          >
            WORK WITH US
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {features.map((feature, index) => (
            <FeatureRow key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
