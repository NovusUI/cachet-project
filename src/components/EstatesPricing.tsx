import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import PaymentCalculatorModal, {
  formatNaira,
  getPaymentPlanDetail,
  type EstatePricingItem,
} from "./PaymentCalculatorModal";

paymentPlans: [
  { id: "outright", label: "Outright payment", months: 0, depositPercent: 1 },
  { id: "3-month", label: "3-month plan", months: 3, depositPercent: 0.4 },
  { id: "6-month", label: "6-month plan", months: 6, depositPercent: 0.3 },
  { id: "12-month", label: "12-month plan", months: 12, depositPercent: 0.3 },
]

const slides: EstatePricingItem[] = [
  {
    id: "cachet-haven",
    name: "Cachet Haven",
    location: "Moniya, Ibadan",
    priceLabel: "Price Per Plot",
    plotPrice: 2_500_000,
    leftImg:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80",
    rightImg:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&auto=format&fit=crop&q=80",
      paymentPlans: [
        { id: "outright", label: "Outright payment", months: 0, depositPercent: 1 },
        { id: "3-month", label: "3-month plan", months: 3, depositPercent: 0.4 },
        { id: "6-month", label: "6-month plan", months: 6, depositPercent: 0.3 },
        { id: "12-month", label: "12-month plan", months: 12, depositPercent: 0.3 },
      ]
  },
  {
    id: "cachet-gardens",
    name: "Cachet Gardens",
    location: "Ido-Ologuneru, Ibadan",
    priceLabel: "Price Per Plot",
    plotPrice: 3_000_000,
    leftImg:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&auto=format&fit=crop&q=80",
    rightImg:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&auto=format&fit=crop&q=80",
      paymentPlans: [
        { id: "outright", label: "Outright payment", months: 0, depositPercent: 1 },
        { id: "3-month", label: "3-month plan", months: 3, depositPercent: 0.4 },
        { id: "6-month", label: "6-month plan", months: 6, depositPercent: 0.3 },
        { id: "12-month", label: "12-month plan", months: 12, depositPercent: 0.3 },
      ]
  },
  {
    id: "cachet-city",
    name: "Cachet City",
    location: "Epe, Lagos",
    priceLabel: "Price Per Plot",
    plotPrice: 3_500_000,
    leftImg:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=80",
    rightImg:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&auto=format&fit=crop&q=80",
      paymentPlans: [
        { id: "outright", label: "Outright payment", months: 0, depositPercent: 1 },
        { id: "3-month", label: "3-month plan", months: 3, depositPercent: 0.4 },
        { id: "6-month", label: "6-month plan", months: 6, depositPercent: 0.3 },
        { id: "12-month", label: "12-month plan", months: 12, depositPercent: 0.3 },
      ]
  },
  {
    id: "cachet-elite",
    name: "Cachet Elite Estate",
    location: "Ibeju-Lekki, Lagos",
    priceLabel: "Price Per Plot",
    plotPrice: 5_000_000,
    leftImg:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=900&auto=format&fit=crop&q=80",
    rightImg:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&auto=format&fit=crop&q=80",
      paymentPlans: [
        { id: "outright", label: "Outright payment", months: 0, depositPercent: 1 },
        { id: "3-month", label: "3-month plan", months: 3, depositPercent: 0.4 },
        { id: "6-month", label: "6-month plan", months: 6, depositPercent: 0.3 },
        { id: "12-month", label: "12-month plan", months: 12, depositPercent: 0.3 },
      ]
  },
];

const intervalMs = 4500;

const textVariants: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

const imageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.65, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
};

export default function EstatesPricing() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, intervalMs);
  };

  useEffect(() => {
    if (!paused && !calculatorOpen) {
      startTimer();
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [paused, calculatorOpen]);

  const restartTimerIfNeeded = () => {
    if (!paused && !calculatorOpen) {
      startTimer();
    }
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    restartTimerIfNeeded();
  };

  const goToPrevious = () => {
    setCurrent((value) => (value - 1 + slides.length) % slides.length);
    restartTimerIfNeeded();
  };

  const goToNext = () => {
    setCurrent((value) => (value + 1) % slides.length);
    restartTimerIfNeeded();
  };

  const slide = slides[current];

  return (
    <section
      className="select-none bg-white px-6 py-10 md:px-12 md:py-16 lg:px-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className="mb-3 text-xs font-semibold tracking-widest"
            style={{ color: "#C97B3C", letterSpacing: "0.2em" }}
          >
            PHASE ONE
          </p>
          <h2
            className="font-bold"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#4A1D96" }}
          >
            Estates and Pricing.
          </h2>
        </div>

        <div className="flex items-center gap-3 self-start md:self-end">
          <span className="mr-1 text-[0.8rem] font-medium tracking-[0.18em] text-[#8d829a]">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous estate"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#5C2E83]/16 bg-white text-[#5C2E83] shadow-[0_10px_24px_rgba(92,46,131,0.08)] transition-all duration-200 hover:border-[#5C2E83] hover:bg-[#5C2E83] hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14.5 6.5L9 12L14.5 17.5"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next estate"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#D4651A]/16 bg-[#D4651A] text-white shadow-[0_10px_24px_rgba(212,101,26,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9.5 6.5L15 12L9.5 17.5"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-0 lg:flex-row lg:gap-0">
        <div
          className="flex min-w-0 flex-1 flex-col gap-4"
          style={{ flex: "0 0 44%" }}
        >
          <div
            className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-sm p-8 md:p-10"
            style={{ backgroundColor: "#0d0d0d" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${slide.id}-text`}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h3
                  className="mb-6 font-bold leading-tight text-white"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {slide.name}
                </h3>
                <p
                  className="text-white/70 italic"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.4rem)",
                    fontStyle: "italic",
                  }}
                >
                  {slide.location}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="relative min-h-[260px] flex-1 overflow-hidden rounded-sm"
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={`${slide.id}-left-img`}
                src={slide.leftImg}
                alt={slide.name}
                className="absolute inset-0 h-full w-full object-cover"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${slide.id}-price`}
                className="absolute bottom-0 left-0 p-6"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <p className="mb-1 text-base font-bold text-white md:text-lg">
                  {slide.priceLabel}
                </p>
                <p className="text-lg font-semibold text-white opacity-90 md:text-3xl">
                  {formatNaira(slide.plotPrice)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden items-stretch justify-center px-6 lg:flex xl:px-10">
          <div
            className="w-px self-stretch"
            style={{ backgroundColor: "#D4651A", minHeight: "100%" }}
          />
        </div>

        <div
          className="my-4 h-px w-full lg:hidden"
          style={{ backgroundColor: "#D4651A" }}
        />

        <div
          className="relative min-h-[480px] overflow-hidden rounded-sm"
          style={{ flex: "0 0 49%" }}
        >
          <AnimatePresence mode="sync">
            <motion.img
              key={`${slide.id}-right-img`}
              src={slide.rightImg}
              alt={`${slide.name} payment`}
              className="absolute inset-0 h-full w-full object-cover"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/8 to-black/72" />

          <div className="absolute top-6 right-6 left-6 flex items-center justify-between gap-4">
            <p className="text-xl font-semibold text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)] md:text-[2rem]">
              Payment Plans
            </p>

            <button
              type="button"
              onClick={() => setCalculatorOpen(true)}
              aria-label="Open payment plan calculator"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/14 bg-black/28 px-3 text-white shadow-[0_10px_26px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-200 hover:border-[#db7a33]/70 hover:bg-[#5C2E83]/50 hover:text-[#ffd9be]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect
                  x="5"
                  y="3.5"
                  width="14"
                  height="17"
                  rx="2.6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <rect
                  x="8"
                  y="6.7"
                  width="8"
                  height="2.4"
                  rx="1.2"
                  fill="currentColor"
                  opacity="0.75"
                />
                <circle cx="9" cy="13" r="1.05" fill="currentColor" />
                <circle cx="12" cy="13" r="1.05" fill="currentColor" />
                <circle cx="15" cy="13" r="1.05" fill="currentColor" />
                <circle cx="9" cy="16.6" r="1.05" fill="currentColor" />
                <circle cx="12" cy="16.6" r="1.05" fill="currentColor" />
                <circle cx="15" cy="16.6" r="1.05" fill="currentColor" />
              </svg>
              <span className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/84 transition-colors duration-200 group-hover:text-[#ffd9be]">
                CALC
              </span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.id}-payment`}
              className="absolute right-5 bottom-5 left-5 rounded-[1.35rem] border border-white/12 bg-black/48 p-5 shadow-[0_24px_50px_rgba(0,0,0,0.24)] backdrop-blur-md md:right-6 md:bottom-6 md:left-6 md:p-6"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="grid w-full gap-4 sm:grid-cols-3 sm:gap-5">
                {slide.paymentPlans.map((option, index) => (
                  <div
                    key={option.label}
                    className={`${
                      index < slide.paymentPlans.length - 1
                        ? "border-b border-white/12 pb-4 sm:border-r sm:border-b-0 sm:pb-0 sm:pr-5"
                        : ""
                    }`}
                  >
                    <p className="text-[0.8rem] font-semibold leading-snug tracking-[0.04em] text-white md:text-[0.92rem]">
                      {option.label}
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-6 text-white/88 md:text-[0.9rem]">
                      {getPaymentPlanDetail(option)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 md:mt-10">
        {slides.map((entry, index) => (
          <button
            key={entry.id}
            onClick={() => goToSlide(index)}
            className="relative flex items-center justify-center focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            <motion.span
              className="block rounded-full"
              animate={{
                width: index === current ? 10 : 8,
                height: index === current ? 10 : 8,
                backgroundColor: index === current ? "#D4651A" : "#D1D5DB",
                scale: index === current ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      {paused && (
        <p className="mt-3 text-center text-xs tracking-wide text-gray-400">
          Paused
        </p>
      )}

      <PaymentCalculatorModal
        open={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        estates={slides}
        initialEstateId={slide.id}
      />
    </section>
  );
}
