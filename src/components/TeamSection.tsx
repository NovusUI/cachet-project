import * as MarqueeModule from "react-fast-marquee";
import { AnimatePresence, motion } from "framer-motion";
import { type ElementType, useEffect, useId, useRef, useState } from "react";
import type { MarqueeProps } from "react-fast-marquee";
import chairmanPortrait from "../assets/team/chairman-portrait.jpeg";
import directorBolajiPortrait from "../assets/team/director-bolaji-aderemi-lateef.jpeg";
import directorOladimejiPortrait from "../assets/team/director-oladimeji-sonowo.jpeg";
import executiveDirectorOperationsPortrait from "../assets/team/executive-director-operations.jpeg";
import managingDirectorPortrait from "../assets/team/managing-director.jpeg";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  profileReady: boolean;
  bio: string[];
};

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function resolveMarqueeComponent(
  moduleValue: unknown
): ElementType<MarqueeProps> {
  if (typeof moduleValue === "function") {
    return moduleValue as ElementType<MarqueeProps>;
  }

  if (
    moduleValue &&
    typeof moduleValue === "object" &&
    ("$$typeof" in moduleValue || "render" in moduleValue)
  ) {
    return moduleValue as ElementType<MarqueeProps>;
  }

  if (
    moduleValue &&
    typeof moduleValue === "object" &&
    "default" in moduleValue
  ) {
    return resolveMarqueeComponent(
      (moduleValue as { default: unknown }).default
    );
  }

  throw new Error("Unable to resolve react-fast-marquee component export.");
}

const Marquee = resolveMarqueeComponent(MarqueeModule);

const teamMembers: TeamMember[] = [
  {
    id: "chairman",
    name: "Dr. Aderemi Lateef FCA",
    role: "Chairman, Board of Directors",
    image: chairmanPortrait,
    profileReady: true,
    bio: [
      "Aderemi Lateef holds a Doctorate Degree in Economics from the prestigious Babcock University and a Master's Degree in Business Administration (MBA) from Obafemi Awolowo University. He is a Fellow of the Institute of Chartered Accountants of Nigeria, an Associate member of the Chartered Institute of Taxation of Nigeria, an Associate of Certified Fraud Examiners, and a Certified Forensic Accountant. Remi is an Associate member of Disaster Recovery Institute International (DRI), and is also a Business Continuity Professional.",
      "With over thirty years of cognate experience in Corporate Governance Assurance services, finance, and investment management, he started his career with the firm of Akintola Williams and Company (Chartered Accountants), now Deloitte. He is the Executive Director, Finance and Investment with NLPC Pension Administrators Limited.",
    ],
  },
  {
    id: "leadership-two",
    name: "Adeleke Abiola Adekoya",
    role: "Managing Director",
    image: managingDirectorPortrait,
    profileReady: true,
    bio: [
      "Adeleke Abiola Adekoya is the Managing Director of Cachet Realtors Limited, a trusted real estate company committed to delivering exceptional property solutions with integrity, professionalism, and excellence.",
      "Passionate about helping individuals, families, and investors make informed real estate decisions, he believes that property ownership is a pathway to building wealth and securing the future. Under his leadership, Cachet Realtors Limited has remained focused on transparency, customer satisfaction, and creating lasting value for every client.",
      "With a vision to make Cachet Realtors Limited one of Nigeria's most respected real estate brands, Adeleke continues to lead with innovation, ethical leadership, and a steadfast commitment to excellence.",
      '"Integrity in every transaction, excellence in every deal, and value in every investment."',
    ],
  },
  {
    id: "leadership-three",
    name: "Folashade Damilola Odeniyi",
    role: "Executive Director (Operations)",
    image: executiveDirectorOperationsPortrait,
    profileReady: true,
    bio: [
      "Folashade Damilola Odeniyi is the Executive Director (Operations).",
      "She holds a B.Sc. in Psychology and an M.Sc. in Criminology from the prestigious University of Ibadan, the first and the best.",
      "She is a passionate and trusted real estate professional with several years of experience. Known for her exceptional relationship-building skills, many of her clients become long-term partners, a testament to her commitment and authenticity.",
      "Before her appointment as the Executive Director with Cachet Realtors Limited, she was an award-winning marketer and highly compliant professional. Folashade approaches every transaction with integrity and excellence.",
      "She believes her clients are royalty and treats every deal with the highest level of care.",
    ],
  },
  {
    id: "leadership-four",
    name: "Arc. Bolaji Aderemi-Lateef",
    role: "Director",
    image: directorBolajiPortrait,
    profileReady: true,
    bio: [
      "Bolaji is a seasoned Architect with nearly a decade of experience spanning the planning, design, execution, and delivery of complex construction and infrastructure projects across both the public and private sectors.",
      "He possesses expertise in architectural design, project management, stakeholder engagement, risk management, and strategic project delivery. Throughout his career, he has successfully led multidisciplinary teams in the execution of high-value residential, commercial, and institutional developments, ensuring the timely delivery of projects in compliance with regulatory requirements, quality standards, and international best practices.",
      "Bolaji holds a Bachelor of Science (B.Sc.) degree in Architecture and a Master of Science (M.Sc.) degree in Architecture from Covenant University. He began his professional career with Spazio Ideale Interior Designers as a Project Supervisor and subsequently served as a Project Manager at Micdee Designs, leading the delivery of several unique and notable projects.",
      "He later joined ICE Projects Limited as Lead Architect and currently serves as the Chief Operating Officer, where he provides strategic and operational leadership for the Company's activities.",
      "Bolaji brings extensive expertise in project oversight, infrastructure development, strategic planning, and construction risk management, underpinned by a proven track record of delivering complex projects from conception to completion and driving sustainable long-term value creation.",
    ],
  },
  {
    id: "leadership-five",
    name: "Oladimeji Olufunmilayo Sonowo",
    role: "Director",
    image: directorOladimejiPortrait,
    profileReady: true,
    bio: [
      "Dimeji Sonowo, B.Sc., MBA, FCA, is a Director of SFS Capital Nig Ltd (Skye Financial Services Ltd).",
      "He has 27 years of experience in investment banking and asset management, and is a former Head of Asset Management at Investment Banking & Trust Company Ltd (IBTC), now Stanbic IBTC.",
      "He holds an MBA from Manchester Business School and received his undergraduate degree in Accounting.",
      "He is a Fellow of the Institute of Chartered Accountants of Nigeria (FCA) and a registered Director with the Securities & Exchange Commission (SEC).",
      "He is a former EXCO member of the Fund Managers Association of Nigeria (FMAN) and serves on various SEC-recognized committees, including the Global Investment Performance Standard (GIPS) Implementation Committee of CFA.",
    ],
  },
];

function clampIndex(index: number) {
  if (index < 0) {
    return teamMembers.length - 1;
  }

  if (index >= teamMembers.length) {
    return 0;
  }

  return index;
}

function TeamRail({
  name,
  right = false,
  onNavigate,
}: {
  name: string;
  right?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div
      className={`relative z-10 hidden bg-[#fbf8f5] lg:flex ${
        right ? "border-l border-black/10" : "border-r border-black/10"
      }`}
    >
      <p
        className={`absolute top-1/2 left-1/2 whitespace-nowrap text-[1rem] font-medium tracking-[0.02em] text-[#5C2E83] ${
          right ? "rotate-90" : "-rotate-90"
        } -translate-x-1/2 -translate-y-1/2`}
      >
        {name}
      </p>

      {onNavigate ? (
        <button
          type="button"
          onClick={onNavigate}
          aria-label={right ? "Next team profile" : "Previous team profile"}
          className="absolute bottom-6 left-1/2 z-20 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white/72 text-[1.7rem] leading-none text-black transition-colors duration-200 hover:border-[#5C2E83] hover:text-[#5C2E83]"
        >
          {right ? "›" : "‹"}
        </button>
      ) : null}
    </div>
  );
}

function TeamModal({
  member,
  onClose,
  onNext,
  onPrevious,
}: {
  member: TeamMember;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const dialogTitleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusWithinDialog = () => {
      const focusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      );

      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        firstFocusable.focus();
        return;
      }

      panelRef.current?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (
          activeElement === firstFocusable ||
          activeElement === panelRef.current
        ) {
          event.preventDefault();
          lastFocusable.focus();
        }
        return;
      }

      if (activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    const focusTimer = window.setTimeout(focusWithinDialog, 30);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-[#160f18]/72 p-3 sm:p-5 lg:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.99 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[90rem] overflow-hidden border border-[#5C2E83] bg-[#fbf8f5] shadow-[0_28px_70px_rgba(0,0,0,0.28)]"
      >
        <h2 id={dialogTitleId} className="sr-only">
          {member.name}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close team profile"
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white/92 text-black transition-colors duration-200 hover:bg-white lg:top-5 lg:right-5"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 7L17 17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M17 7L7 17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div
          className="grid max-h-[92vh] grid-cols-1 overflow-y-auto pb-24 lg:grid-cols-[4.75rem_minmax(0,0.82fr)_minmax(0,1fr)_4.75rem] lg:overflow-hidden lg:pb-0"
          style={{ height: "min(88vh, 46rem)" }}
        >
          <TeamRail name={member.name} onNavigate={onPrevious} />

          <div className="flex min-h-0 flex-col bg-[#fbf8f5] px-6 pt-14 pb-7 sm:px-8 lg:px-12 lg:pt-14 lg:pb-10">
            <div className="lg:hidden">
              <p className="text-[0.78rem] font-semibold tracking-[0.2em] text-[#db7a33]">
                TEAM PROFILE
              </p>
              <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight text-[#1f1b22] sm:text-[1.75rem]">
                {member.name}
              </h3>
            </div>

            <div className="mt-2 inline-flex border border-black/45 px-4 py-4 sm:px-5 lg:mt-0">
              <h3 className="text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] text-[#5C2E83] sm:text-[1.35rem] lg:text-[1.45rem]">
                {member.role}
              </h3>
            </div>

            <div className="mt-8 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-4">
              <div className="space-y-7 text-[0.98rem] leading-8 text-[#1f1b22] sm:text-[1.03rem]">
                {member.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

          </div>

          <div className="relative z-0 flex min-h-[18rem] items-center justify-center overflow-hidden bg-white sm:min-h-[22rem] lg:min-h-0">
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="block h-full w-full object-contain object-center"
            />
          </div>

          <TeamRail name={member.name} right onNavigate={onNext} />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-black/10 bg-[#fbf8f5]/96 px-6 py-4 backdrop-blur-sm lg:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous team profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[1.7rem] leading-none text-black transition-colors duration-200 hover:border-[#5C2E83] hover:text-[#5C2E83]"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next team profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[1.7rem] leading-none text-black transition-colors duration-200 hover:border-[#5C2E83] hover:text-[#5C2E83]"
            >
              ›
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TeamCard({
  member,
  index,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group block w-[16.75rem] shrink-0 text-left sm:w-[18.5rem] lg:w-[19.75rem] xl:w-[21rem]"
      aria-label={`Open ${member.name} profile`}
    >
      <article className="overflow-hidden bg-black shadow-[0_18px_38px_rgba(22,16,30,0.12)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[0.7] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/36 via-transparent to-transparent" />

          {!member.profileReady ? (
            <span className="absolute top-4 right-4 rounded-full border border-white/18 bg-black/35 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-white/82 uppercase backdrop-blur-sm">
              Updating
            </span>
          ) : null}
        </div>

        <div className="relative bg-[#5C2E83] px-5 py-4 text-white">
          <span className="absolute inset-x-5 top-0 h-px bg-white/18" />
          <p className="text-[1.08rem] font-medium leading-tight">
            {member.name}
          </p>
          <p className="mt-2 text-[0.95rem] leading-7 text-white/84">
            {member.role}
          </p>
        </div>
      </article>
    </button>
  );
}

function MarqueeBoostButton({
  boosted,
  onClick,
}: {
  boosted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Temporarily speed up team marquee"
      aria-pressed={boosted}
      className={`relative z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
        boosted
          ? "border-[#5C2E83] bg-[#5C2E83] text-white shadow-[0_14px_28px_rgba(92,46,131,0.2)]"
          : "border-[#e5d8ec] bg-white text-[#5C2E83] hover:border-[#5C2E83] hover:bg-[#f8f1fb]"
      }`}
    >
      <span className="text-[1.45rem] leading-none">»</span>
    </button>
  );
}

export default function TeamSection() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [marqueeBoosted, setMarqueeBoosted] = useState(false);
  const marqueeRootRef = useRef<HTMLDivElement>(null);
  const marqueeBoostTimeoutRef = useRef<number | null>(null);
  const marqueeBoostFrameRef = useRef<number | null>(null);
  const marqueePlaybackRateRef = useRef(1);
  const selectedMember = modalIndex === null ? null : teamMembers[modalIndex];

  useEffect(() => {
    return () => {
      if (marqueeBoostTimeoutRef.current !== null) {
        window.clearTimeout(marqueeBoostTimeoutRef.current);
      }

      if (marqueeBoostFrameRef.current !== null) {
        window.cancelAnimationFrame(marqueeBoostFrameRef.current);
      }
    };
  }, []);

  const applyMarqueePlaybackRate = (playbackRate: number) => {
    marqueePlaybackRateRef.current = playbackRate;

    marqueeRootRef.current
      ?.querySelectorAll(".rfm-marquee")
      .forEach((element) => {
        element.getAnimations().forEach((animation) => {
          const animationController = animation as Animation & {
            playbackRate: number;
            updatePlaybackRate?: (nextRate: number) => void;
          };

          if (typeof animationController.updatePlaybackRate === "function") {
            animationController.updatePlaybackRate(playbackRate);
            return;
          }

          animationController.playbackRate = playbackRate;
        });
      });
  };

  const stopMarqueeBoostTimers = () => {
    if (marqueeBoostTimeoutRef.current !== null) {
      window.clearTimeout(marqueeBoostTimeoutRef.current);
      marqueeBoostTimeoutRef.current = null;
    }

    if (marqueeBoostFrameRef.current !== null) {
      window.cancelAnimationFrame(marqueeBoostFrameRef.current);
      marqueeBoostFrameRef.current = null;
    }
  };

  const tweenMarqueePlaybackRate = (
    targetRate: number,
    duration: number,
    onComplete?: () => void
  ) => {
    if (duration <= 0) {
      applyMarqueePlaybackRate(targetRate);
      onComplete?.();
      return;
    }

    if (marqueeBoostFrameRef.current !== null) {
      window.cancelAnimationFrame(marqueeBoostFrameRef.current);
    }

    const startRate = marqueePlaybackRateRef.current;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      const nextRate = startRate + (targetRate - startRate) * easedProgress;

      applyMarqueePlaybackRate(nextRate);

      if (progress < 1) {
        marqueeBoostFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      marqueeBoostFrameRef.current = null;
      onComplete?.();
    };

    marqueeBoostFrameRef.current = window.requestAnimationFrame(step);
  };

  const triggerMarqueeBoost = () => {
    stopMarqueeBoostTimers();

    setMarqueeBoosted(true);

    tweenMarqueePlaybackRate(2.8, 180, () => {
      marqueeBoostTimeoutRef.current = window.setTimeout(() => {
        tweenMarqueePlaybackRate(1, 700, () => {
          setMarqueeBoosted(false);
        });
        marqueeBoostTimeoutRef.current = null;
      }, 260);
    });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-white px-6 py-18 md:px-10 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute top-0 left-[-7rem] h-56 w-56 rounded-full bg-[#f2e3d6]/35 blur-3xl" />
        <div className="pointer-events-none absolute right-[-6rem] bottom-10 h-72 w-72 rounded-full bg-[#e7d9f0]/28 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[0.72rem] font-bold tracking-[0.22em] text-[#db7a33]">
              THE TEAM
            </p>
            <h2 className="mt-5 text-[2.2rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#4c2776] sm:text-[2.9rem] lg:text-[3.2rem]">
              Meet <span className="text-[#db7a33]">Cachet&apos;s</span> Team
            </h2>
            <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-[#4e4655] sm:text-[1.05rem]">
              Browse through Cachet&apos;s leadership profiles and open each
              card for a fuller view of the people shaping the brand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.68,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10"
          >
            <div className="relative">
              <div
                ref={marqueeRootRef}
                className="min-w-0 overflow-hidden  border border-[#efe6f4] bg-[#faf6fb] px-0 py-6 shadow-[0_20px_44px_rgba(29,19,37,0.05)] sm:px-0"
              >
                <Marquee
                  autoFill
                  pauseOnHover
                  pauseOnClick
                  gradient={false}
                  speed={46}
                  direction="left"
                  className="[--gap:1.25rem]"
                >
                  {teamMembers.map((member, index) => (
                    <div key={member.id} className="mr-5 sm:mr-6">
                      <TeamCard
                        member={member}
                        index={index}
                        onOpen={setModalIndex}
                      />
                    </div>
                  ))}
                </Marquee>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-3 z-20 flex items-center sm:right-4">
                <div className="pointer-events-auto">
                  <MarqueeBoostButton
                    boosted={marqueeBoosted}
                    onClick={triggerMarqueeBoost}
                  />
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[0.9rem] leading-7 text-[#8a8191]">
              Select any profile card to open a fuller biography view.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedMember ? (
          <TeamModal
            member={selectedMember}
            onClose={() => setModalIndex(null)}
            onPrevious={() =>
              setModalIndex((value) => clampIndex((value ?? 0) - 1))
            }
            onNext={() =>
              setModalIndex((value) => clampIndex((value ?? 0) + 1))
            }
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
