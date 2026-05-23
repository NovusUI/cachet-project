import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    id: 0,
    number: "01",
    title: "Real Estate Advisory Services",
    description:
      "Strategic guidance on pricing, due diligence, title verification, and the smartest path to your next property move.",
    image:
      "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 1,
    number: "02",
    title: "Property Sales and Acquisition",
    description:
      "End-to-end support for buying and selling, from sourcing the right property to negotiation and close.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    number: "03",
    title: "Real Estate Investment",
    description:
      "Market-led insight for portfolio growth, land banking, and investment decisions built for long-term value.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    number: "04",
    title: "Property and Facility Management",
    description:
      "Reliable occupancy, maintenance, inspections, and day-to-day asset care that protects long-term value.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    number: "05",
    title: "Project Management",
    description:
      "Professional coordination of schedules, teams, budgets, and site delivery from planning to final handover.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    number: "06",
    title: "Property Development",
    description:
      "From concept to completed estate schemes, we shape land into viable, high-demand real estate products.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    number: "07",
    title: "Building Construction",
    description:
      "Quality residential and commercial builds executed with strong supervision, workmanship, and delivery standards.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&auto=format&fit=crop&q=80",
  },
];

type Service = (typeof services)[number];
type MarqueeService = Service & { instanceId: string };

const collapsedWidth = 260;
const expandedWidth = 660;
const cardHeight = 520;
const pauseMs = 3600;
const resumeDelayMs = 550;
const scrollSpeed = 42;

const marqueeGroups: MarqueeService[][] = Array.from({ length: 2 }, (_, groupIndex) =>
  services.map((service) => ({
    ...service,
    instanceId: `${service.id}-${groupIndex}`,
  })),
);

function ServiceCard({
  service,
  isExpanded,
}: {
  service: MarqueeService;
  isExpanded: boolean;
}) {
  return (
    <motion.div
      className="relative flex-shrink-0 cursor-default overflow-hidden bg-gray-900 rounded-sm"
      animate={{ width: isExpanded ? expandedWidth : collapsedWidth }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: cardHeight }}
    >
      <img
        src={service.image}
        alt={service.title}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

      {/* Number */}
      <span
        className="pointer-events-none absolute top-4 right-5 select-none font-bold text-white"
        style={{ fontSize: "4.5rem", lineHeight: 1, opacity: 0.18 }}
      >
        {service.number}
      </span>

      {/* Header */}
      <motion.div
        className="absolute top-6 left-6 pointer-events-none"
        animate={{ width: isExpanded ? "75%" : "calc(100% - 32px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h3
          className="text-white font-bold leading-snug"
          animate={{ fontSize: isExpanded ? "2.4rem" : "1.15rem" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {service.title}
        </motion.h3>
      </motion.div>

      {/* Content */}
      <motion.div
        className="absolute bottom-7 right-6 pointer-events-none"
        animate={{
          width: isExpanded ? "65%" : "calc(100% - 48px)", // 48px offsets the 24px (right-6) to simulate a matching left-6 when collapsed
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-white/85 italic leading-relaxed"
          animate={{
            textAlign: isExpanded ? "right" : "left",
            fontSize: isExpanded ? "1.05rem" : "0.95rem",
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {service.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [playing, setPlaying] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const playingRef = useRef(playing);
  const expandedCardIdRef = useRef<number | null>(expandedCardId);
  playingRef.current = playing;
  expandedCardIdRef.current = expandedCardId;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const cycleWidthRef = useRef(0);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastExpandedInstanceRef = useRef<string | null>(null);
  const isMobileRef = useRef(false);

  // Measure the group width safely
  useEffect(() => {
    if (!firstGroupRef.current) return;

    const updateCycleWidth = () => {
      if (expandedCardIdRef.current === null && firstGroupRef.current) {
        cycleWidthRef.current = firstGroupRef.current.getBoundingClientRect().width;
      }
    };

    updateCycleWidth();
    const resizeObserver = new ResizeObserver(updateCycleWidth);
    resizeObserver.observe(firstGroupRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Monitor screen size for mobile check
  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Marquee scroll loop
  useEffect(() => {
    const check = () => {
      if (!containerRef.current || !trackRef.current) {
        rafRef.current = requestAnimationFrame(check);
        return;
      }

      const now = performance.now();
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = now;
      }

      let deltaSeconds = (now - lastFrameTimeRef.current) / 1000;
      if (deltaSeconds > 0.1) deltaSeconds = 0.016;
      lastFrameTimeRef.current = now;

      const cycleWidth = cycleWidthRef.current;

      if (cycleWidth > 0) {
        if (playingRef.current) {
          offsetRef.current += deltaSeconds * scrollSpeed;
          offsetRef.current %= cycleWidth;
        }
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      // Check for triggers only if playing, not currently expanded, AND NOT ON MOBILE
      if (playingRef.current && expandedCardIdRef.current === null && !isMobileRef.current) {
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const cards = containerRef.current.querySelectorAll<HTMLElement>("[data-card-instance]");

        for (const element of cards) {
          const rect = element.getBoundingClientRect();
          const relativeLeft = rect.left - containerLeft;
          const instanceId = element.dataset.cardInstance;

          if (relativeLeft <= 2 && relativeLeft > -20) {
            if (
              instanceId &&
              instanceId.endsWith("-0") &&
              instanceId !== lastExpandedInstanceRef.current
            ) {
              lastExpandedInstanceRef.current = instanceId;
              const cardId = Number.parseInt(element.dataset.cardId ?? "", 10);

              setPlaying(false);
              setExpandedCardId(cardId);

              if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
              if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

              expandTimerRef.current = setTimeout(() => {
                setExpandedCardId(null);

                resumeTimerRef.current = setTimeout(() => {
                  setPlaying(true);
                  lastFrameTimeRef.current = null;
                }, resumeDelayMs);
              }, pauseMs);

              break;
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(check);
    };

    rafRef.current = requestAnimationFrame(check);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  return (
    <section className="overflow-hidden bg-gray-50 pt-14 pb-0">
      <div className="mb-12 px-6 text-center">
        <p
          className="mb-4 text-xs font-bold tracking-widest"
          style={{ color: "#C97B3C", letterSpacing: "0.22em" }}
        >
          WHAT WE DO
        </p>
        <h2
          className="mb-2 font-bold leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#3B1F6E" }}
        >
          Comprehensive Real Estate
        </h2>
        <h2
          className="mb-5 font-bold leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#D4651A" }}
        >
          Services
        </h2>
        <p
          className="mx-auto max-w-lg text-gray-500 italic"
          style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)", lineHeight: 1.7 }}
        >
          Everything you need, under one roof. We deliver excellence at every
          stage of the real estate journey.
        </p>
      </div>

      <div ref={containerRef} className="overflow-hidden pb-12">
        <div ref={trackRef} className="services-marquee-track flex w-max">
          {marqueeGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              ref={groupIndex === 0 ? firstGroupRef : undefined}
              className="flex shrink-0"
            >
              {group.map((service) => (
                <div
                  key={service.instanceId}
                  data-card-id={service.id}
                  data-card-instance={service.instanceId}
                  className="shrink-0 pr-3"
                >
                  <ServiceCard
                    service={service}
                    isExpanded={expandedCardId === service.id}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
