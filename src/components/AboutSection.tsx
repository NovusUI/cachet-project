import { motion } from "framer-motion";

function scrollToContactSection() {
  document.getElementById("contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const topImageVariants = {
  hidden: { opacity: 0, y: 32, x: -10, scale: 0.96, skewY: -3, rotate: -2.2 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    skewY: 0,
    rotate: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const bottomImageVariants = {
  hidden: { opacity: 0, y: 38, x: 12, scale: 0.96, skewY: 3, rotate: 2.4 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    skewY: 0,
    rotate: 0,
    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.06,
    },
  },
};

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-[#edf6f1] px-6 py-18 md:px-10 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute top-0 right-[-8rem] h-72 w-72 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-[-6rem] h-64 w-64 rounded-full bg-[#d5e8df]/55 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-18 xl:gap-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          className="order-2 lg:order-1"
        >
          <div className="relative mx-auto flex max-w-xl flex-col gap-5 sm:max-w-2xl lg:max-w-none lg:gap-0">
            <motion.div
              variants={topImageVariants}
              className="relative z-10 w-[72%] overflow-hidden rounded-[1.2rem] shadow-[0_28px_60px_rgba(40,55,48,0.13)] sm:w-[64%] lg:ml-2 lg:w-[62%]"
            >
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80"
                alt="Elegant Cachet interior"
                className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[300px]"
              />
            </motion.div>

            <motion.div
              variants={bottomImageVariants}
              className="relative z-20 ml-auto -mt-12 w-[78%] overflow-hidden rounded-[1.2rem]  sm:-mt-16 sm:w-[68%] lg:-mt-18 lg:mr-1 lg:w-[66%] border-8 border-[#edf6f1]"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&auto=format&fit=crop&q=80"
                alt="Premium Cachet property exterior"
                className="h-[220px] w-full object-cover sm:h-[290px] lg:h-[320px]"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.08 }}
          className="order-1 lg:order-2"
        >
          <motion.p
            variants={textVariants}
            className="text-[0.72rem] font-bold tracking-[0.22em] text-[#db7a33]"
          >
            ABOUT CACHET
          </motion.p>

          <motion.h2
            variants={textVariants}
            className="mt-5 max-w-xl text-[2.35rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#222222] sm:text-[3rem] lg:text-[4rem]"
          >
            Excellence in every <span className="text-[#db7a33]">Deal</span>
          </motion.h2>

          <motion.div
            variants={textVariants}
            className="mt-5 h-px w-18 bg-[#db7a33]/55"
          />

          <motion.p
            variants={textVariants}
            className="mt-5 max-w-xl text-[1rem] leading-8 text-[#35393a]/88 sm:text-[1.08rem] lg:text-[1.18rem]"
          >
            We are a full-service real estate firm in Ibadan, Nigeria, built on
            integrity and professional rigor. From real estate brokage to land acquisition, estate development,
            and property management.
          </motion.p>

          <motion.button
            variants={textVariants}
            type="button"
            onClick={scrollToContactSection}
            whileHover={{
              y: -3,
              boxShadow: "0 18px 28px rgba(92, 46, 131, 0.18)",
            }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-9 inline-flex items-center justify-center bg-[#5C2E83] px-7 py-4 text-sm font-medium tracking-[0.14em] text-white sm:px-9"
          >
            GET A CONSULTATION
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
