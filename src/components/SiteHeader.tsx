import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cachetLogo from "../assets/cachet-logo.png";
import reehLogo from "../assets/reeh.png";

type AppPath = "/" | "/virtual-tour";

type SiteHeaderProps = {
  currentPath: AppPath;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: "about" | "listing" | "services" | "contact") => void;
  onNavigateVirtualTour: () => void;
};

type NavItem = {
  label: "HOME" | "ABOUT" | "LISTING" | "SERVICES" | "VIRTUAL TOUR";
  sectionId?: "about" | "listing" | "services";
};

const navItems: NavItem[] = [
  { label: "HOME" },
  { label: "ABOUT", sectionId: "about" },
  { label: "SERVICES", sectionId: "services" },
  { label: "LISTING", sectionId: "listing" },
  { label: "VIRTUAL TOUR" },
];

const MenuToggleIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    style={{ overflow: "visible" }}
  >
    <AnimatePresence mode="wait" initial={false}>
      {!isOpen ? (
        <motion.g
          key="hamburger"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
        >
          <line x1="4" y1="9" x2="28" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="16" x2="28" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="23" x2="28" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      ) : (
        <motion.g
          key="roof-close"
          initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.7, rotate: 45 }}
          transition={{
            duration: 0.35,
            type: "spring",
            stiffness: 280,
            damping: 22,
          }}
          style={{ transformOrigin: "16px 16px" }}
        >
          <line
            x1="7"
            y1="25.5"
            x2="18.4"
            y2="8.4"
            stroke="#5C2E83"
            strokeWidth="2.55"
            strokeLinecap="round"
          />
          <line
            x1="25"
            y1="25.5"
            x2="13.6"
            y2="8.4"
            stroke="#D4651A"
            strokeWidth="2.55"
            strokeLinecap="round"
          />
        </motion.g>
      )}
    </AnimatePresence>
  </svg>
);

export default function SiteHeader({
  currentPath,
  onNavigateHome,
  onNavigateSection,
  onNavigateVirtualTour,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem["label"]>(
    currentPath === "/virtual-tour" ? "VIRTUAL TOUR" : "HOME"
  );

  useEffect(() => {
    setActiveNav(currentPath === "/virtual-tour" ? "VIRTUAL TOUR" : "HOME");
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (currentPath !== "/") {
      setIsPastHero(false);
      return;
    }

    const updateHeroState = () => {
      const heroThreshold = Math.max(window.innerHeight - 120, 0);
      setIsPastHero(window.scrollY > heroThreshold);
    };

    updateHeroState();
    window.addEventListener("scroll", updateHeroState, { passive: true });
    window.addEventListener("resize", updateHeroState);

    return () => {
      window.removeEventListener("scroll", updateHeroState);
      window.removeEventListener("resize", updateHeroState);
    };
  }, [currentPath]);

  const handleNavClick = (item: NavItem) => {
    setActiveNav(item.label);
    setMenuOpen(false);

    if (item.label === "HOME") {
      onNavigateHome();
      return;
    }

    if (item.label === "VIRTUAL TOUR") {
      onNavigateVirtualTour();
      return;
    }

    if (item.sectionId) {
      onNavigateSection(item.sectionId);
    }
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl transition-[background-color,border-color] duration-300 md:px-8 ${
          isPastHero
            ? "border-b border-white/10 bg-black/28 supports-[backdrop-filter]:bg-black/22"
            : "border-b border-white/10 bg-black/12 supports-[backdrop-filter]:bg-black/8"
        }`}
      >
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left"
          aria-label="Go to Cachet homepage"
        >
          <img
            src={cachetLogo}
            alt="Cachet logo"
            fetchPriority="high"
            decoding="async"
            className="h-11 w-auto shrink-0 object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.28)]"
          />
          <div className="flex flex-col leading-tight">
            <span
              className="font-bold text-white"
              style={{ fontSize: "1.1rem", letterSpacing: "0.18em" }}
            >
              CACHET
            </span>
            <span
              className="font-normal text-white/60"
              style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}
            >
              REALTORS LIMITED
            </span>
          </div>
        </button>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`text-xs tracking-widest transition-colors duration-200 ${
                activeNav === item.label
                  ? "border-b-2 border-white pb-0.5 font-bold text-white"
                  : "font-normal text-white/55 hover:text-white/90"
              }`}
              style={{ letterSpacing: "0.12em" }}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setActiveNav("HOME");
              onNavigateSection("contact");
            }}
            className="border border-white px-6 py-2.5 text-xs font-bold tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-black"
            style={{ letterSpacing: "0.15em" }}
          >
            ENQUIRE
          </button>
        </div>

        <button
          type="button"
          className="relative z-50 p-1 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <MenuToggleIcon isOpen={menuOpen} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            style={{ backgroundColor: "#080808" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <img
              src={reehLogo}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute h-96 w-auto opacity-[0.08] object-contain"
            />

            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.07, duration: 0.3 }}
                onClick={() => handleNavClick(item)}
                className={`text-xl tracking-widest transition-colors duration-200 ${
                  activeNav === item.label
                    ? "font-bold text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
                style={{ letterSpacing: "0.2em" }}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.3 }}
              onClick={() => {
                setActiveNav("HOME");
                setMenuOpen(false);
                onNavigateSection("contact");
              }}
              className="mt-4 border border-white/70 px-10 py-3 text-sm font-bold tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-black"
              style={{ letterSpacing: "0.15em" }}
            >
              ENQUIRE
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
