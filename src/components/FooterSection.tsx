import { motion } from "framer-motion";
import reehLogo from "../assets/reeh.png";

const services = [
  { label: "Real Estate Advisory Services" },
  { label: "Property Sales and Acquisition" },
  { label: "Real Estate Investment" },
  { label: "Property and Facility Management" },
  { label: "Project Management" },
  { label: "Property Development" },
  { label: "Building Construction" },
];

const company = [
  { label: "About Us", href: "/#about" },
  { label: "Why Cachet", href: "/#why-cachet" },
  { label: "Contact", href: "/#contact" },
  { label: "Listings", href: "/#listing" },
];

const contact = [
  { label: "07045413648", href: "tel:07045413648" },
  { label: "09039968345", href: "tel:09039968345" },
  { label: "Cachetrealtors26@gmail.com", href: "mailto:Cachetrealtors26@gmail.com" },
  { label: "cachetrealtorsng.com" },
];

const socials = [
  {
    label: "Facebook",
    value: "Cachet Realtors Limited",
    href: "https://www.facebook.com/CachetRealtorsLimited",
  },
  {
    label: "Instagram",
    value: "@Cachetrealtors",
    href: "https://www.instagram.com/cachetrealtors/",
  },
  {
    label: "TikTok",
    value: "@cachet.realtors",
    href: "https://www.tiktok.com/@cachet.realtors",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <motion.div variants={itemVariants}>
      <h3 className="text-[0.82rem] font-medium tracking-[0.22em] text-white/60 sm:text-[0.9rem]">
        {title}
      </h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                className="text-[1rem] leading-7 text-white/92 transition-colors duration-200 hover:text-[#db7a33] sm:text-[1.05rem]"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-[1rem] leading-7 text-white/92 sm:text-[1.05rem]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#343434] px-6 pt-16 pb-0 md:px-10 lg:px-16 lg:pt-18">
      <div className="pointer-events-none absolute inset-x-0 top-26 flex justify-center overflow-hidden">
        <span className="select-none text-[6.5rem] font-medium tracking-[0.18em] text-white/[0.018] sm:text-[8.5rem] lg:text-[10rem]">
          CACHET
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-3 md:gap-x-10 md:gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.6fr)_minmax(0,0.6fr)_minmax(0,0.72fr)] lg:gap-14"
      >
        <motion.div variants={itemVariants} className="max-w-md md:col-span-3 lg:col-span-1">
          <div className="flex items-center gap-4">
            <img
              src={reehLogo}
              alt="Cachet monogram"
              loading="lazy"
              decoding="async"
              className="h-28 w-auto shrink-0 object-contain"
            />
            <h2 className="text-[2.3rem] font-bold tracking-[0.08em] text-white sm:text-[2.65rem]">
              CACHET
            </h2>
          </div>
          <p className="mt-6 text-[1.05rem] font-semibold tracking-[0.07em] text-white">
            REALTORS LIMITED
          </p>
          <p className="mt-6 text-[1.02rem] leading-8 text-white/92 sm:text-[1.08rem]">
            Your trusted real estate partner. Delivering excellence from
            acquisition to construction across Nigeria.
          </p>
        </motion.div>

        <FooterColumn title="SERVICES" items={services} />
        <FooterColumn title="COMPANY" items={company} />
        <motion.div variants={itemVariants}>
          <h3 className="text-[0.82rem] font-medium tracking-[0.22em] text-white/60 sm:text-[0.9rem]">
            CONTACT
          </h3>
          <ul className="mt-6 space-y-4">
            {contact.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[1rem] leading-7 text-white/92 transition-colors duration-200 hover:text-[#db7a33] sm:text-[1.05rem]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-[1rem] leading-7 text-white/92 sm:text-[1.05rem]">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h4 className="text-[0.78rem] font-medium tracking-[0.22em] text-white/45">
              SOCIALS
            </h4>
            <ul className="mt-4 space-y-3">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.98rem] leading-7 text-white/92 transition-colors duration-200 hover:text-[#db7a33] sm:text-[1.02rem]"
                  >
                    {item.label} · {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative mx-auto mt-16 max-w-7xl border-t border-white/6 bg-[#363636] px-0 py-10 sm:mt-20 lg:mt-24">
        <p className="text-[0.74rem] tracking-[0.02em] text-white/28 sm:text-[0.82rem]">
          © 2026 CACHET REALTORS LIMITED · NO 42, OBAFEMI AWOLOWO WAY,
          OKE-BOLA, IBADAN · EXCELLENCE IN EVERY DEAL
        </p>
      </div>
    </footer>
  );
}
