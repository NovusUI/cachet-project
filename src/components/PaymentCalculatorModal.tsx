import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type PaymentPlanOption = {
  id: string;
  label: string;
  months: number;
  depositPercent: number;
};

export type EstatePricingItem = {
  id: string;
  name: string;
  location: string;
  priceLabel: string;
  plotPrice: number;
  leftImg: string;
  rightImg: string;
  paymentPlans: PaymentPlanOption[];
};

type PaymentCalculatorModalProps = {
  open: boolean;
  onClose: () => void;
  estates: EstatePricingItem[];
  initialEstateId: string;
};

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function formatNaira(value: number) {
  return nairaFormatter.format(value);
}

export function getPaymentPlanDetail(plan: PaymentPlanOption) {
  if (plan.months === 0) {
    return "100% upfront.";
  }

  return `${Math.round(plan.depositPercent * 100)}% initial deposit.`;
}

function getInitialPlanId(estate: EstatePricingItem) {
  return estate.paymentPlans[0]?.id ?? "";
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/8 py-3">
      <dt className="text-[0.72rem] font-semibold tracking-[0.16em] text-white/58">
        {label}
      </dt>
      <dd className="text-right text-[0.94rem] font-medium leading-6 text-white">
        {value}
      </dd>
    </div>
  );
}

function CalculatorGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
  );
}

export default function PaymentCalculatorModal({
  open,
  onClose,
  estates,
  initialEstateId,
}: PaymentCalculatorModalProps) {
  const dialogTitleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedEstateId, setSelectedEstateId] = useState(initialEstateId);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [plotCount, setPlotCount] = useState(1);

  const selectedEstate =
    estates.find((estate) => estate.id === selectedEstateId) ?? estates[0];
  const selectedPlan =
    selectedEstate.paymentPlans.find((plan) => plan.id === selectedPlanId) ??
    selectedEstate.paymentPlans[0];

  const totalPropertyValue = selectedEstate.plotPrice * plotCount;
  const depositAmount = totalPropertyValue * selectedPlan.depositPercent;
  const remainingBalance = totalPropertyValue - depositAmount;
  const monthlyInstallment =
    selectedPlan.months > 0 ? remainingBalance / selectedPlan.months : 0;

  useEffect(() => {
    if (!open) {
      return;
    }

    const nextEstate =
      estates.find((estate) => estate.id === initialEstateId) ?? estates[0];

    setSelectedEstateId(nextEstate.id);
    setSelectedPlanId(getInitialPlanId(nextEstate));
    setPlotCount(1);
  }, [open, initialEstateId, estates]);

  useEffect(() => {
    if (!selectedEstate) {
      return;
    }

    if (!selectedEstate.paymentPlans.some((plan) => plan.id === selectedPlanId)) {
      setSelectedPlanId(getInitialPlanId(selectedEstate));
    }
  }, [selectedEstate, selectedPlanId]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusWithinDialog = () => {
      const focusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      );

      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        panelRef.current?.focus();
      }
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
        if (activeElement === firstFocusable || activeElement === panelRef.current) {
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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#140d18]/66 p-0 sm:p-5 md:items-center md:p-8"
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
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#18111c]/95 text-white shadow-[0_34px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:max-w-4xl sm:rounded-[2rem]"
          >
            <div className="border-b border-white/8 px-5 py-5 sm:px-7 md:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-[#db7a33]">
                    PAYMENT CALCULATOR
                  </p>
                  <h3
                    id={dialogTitleId}
                    className="mt-3 text-[1.55rem] font-semibold leading-tight text-white sm:text-[1.9rem]"
                  >
                    Estimate your plot payment breakdown
                  </h3>
                  <p className="mt-3 max-w-2xl text-[0.94rem] leading-7 text-white/68">
                    Select an estate, number of plots, and payment plan to see a
                    live estimate styled to match the Cachet experience.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close payment calculator"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/78 transition-all duration-200 hover:bg-white/12 hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6.75 6.75L17.25 17.25"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17.25 6.75L6.75 17.25"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-7 md:px-8 md:py-7">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
                <div className="rounded-[1.55rem] border border-white/8 bg-white/[0.04] p-5 sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5C2E83]/18 text-[#db7a33]">
                      <CalculatorGlyph />
                    </div>
                    <div>
                      <h4 className="text-[1rem] font-semibold text-white">
                        Calculator Inputs
                      </h4>
                      <p className="text-[0.84rem] text-white/58">
                        Adjust the fields to preview your breakdown.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <label className="block">
                      <span className="text-[0.78rem] font-semibold tracking-[0.18em] text-white/56">
                        LOCATION
                      </span>
                      <div className="relative mt-3">
                        <select
                          value={selectedEstate.id}
                          onChange={(event) => {
                            const nextEstate =
                              estates.find((estate) => estate.id === event.target.value) ??
                              estates[0];

                            setSelectedEstateId(nextEstate.id);
                            setSelectedPlanId((currentPlanId) =>
                              nextEstate.paymentPlans.some(
                                (plan) => plan.id === currentPlanId
                              )
                                ? currentPlanId
                                : getInitialPlanId(nextEstate)
                            );
                          }}
                          className="h-[3.25rem] w-full appearance-none rounded-[1rem] border border-white/12 bg-[#241b29] px-4 pr-11 text-[0.95rem] text-white outline-none transition-colors duration-200 focus:border-[#db7a33]"
                        >
                          {estates.map((estate) => (
                            <option key={estate.id} value={estate.id}>
                              {estate.location} - {estate.name}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#db7a33]"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M6.5 9.5L12 15L17.5 9.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-[0.78rem] font-semibold tracking-[0.18em] text-white/56">
                        NUMBER OF PLOTS
                      </span>
                      <div className="mt-3 flex items-center rounded-[1rem] border border-white/12 bg-[#241b29] p-1.5">
                        <button
                          type="button"
                          onClick={() => setPlotCount((value) => Math.max(1, value - 1))}
                          className="flex h-11 w-11 items-center justify-center rounded-[0.8rem] bg-white/6 text-white transition-colors duration-200 hover:bg-white/12"
                          aria-label="Decrease plot count"
                        >
                          <span className="text-lg leading-none">-</span>
                        </button>
                        <input
                          type="number"
                          min={1}
                          inputMode="numeric"
                          value={plotCount}
                          onChange={(event) => {
                            const nextValue = Number.parseInt(event.target.value, 10);
                            setPlotCount(Number.isNaN(nextValue) ? 1 : Math.max(1, nextValue));
                          }}
                          className="h-11 flex-1 bg-transparent text-center text-[1rem] font-medium text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <button
                          type="button"
                          onClick={() => setPlotCount((value) => value + 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-[0.8rem] bg-[#5C2E83] text-white transition-all duration-200 hover:brightness-110"
                          aria-label="Increase plot count"
                        >
                          <span className="text-lg leading-none">+</span>
                        </button>
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-[0.78rem] font-semibold tracking-[0.18em] text-white/56">
                        PAYMENT PLAN
                      </span>
                      <div className="relative mt-3">
                        <select
                          value={selectedPlan.id}
                          onChange={(event) => setSelectedPlanId(event.target.value)}
                          className="h-[3.25rem] w-full appearance-none rounded-[1rem] border border-white/12 bg-[#241b29] px-4 pr-11 text-[0.95rem] text-white outline-none transition-colors duration-200 focus:border-[#db7a33]"
                        >
                          {selectedEstate.paymentPlans.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                              {plan.label}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#db7a33]"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M6.5 9.5L12 15L17.5 9.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="rounded-[1.55rem] border border-white/8 bg-gradient-to-br from-[#2d183f] via-[#211229] to-[#171018] p-5 shadow-[0_22px_56px_rgba(0,0,0,0.18)] sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-[#db7a33]">
                        LIVE ESTIMATE
                      </p>
                      <h4 className="mt-3 text-[1.18rem] font-semibold text-white">
                        {selectedEstate.name}
                      </h4>
                      <p className="mt-1 text-[0.92rem] text-white/62">
                        {selectedEstate.location}
                      </p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.14em] text-white/72">
                      {selectedPlan.label}
                    </div>
                  </div>

                  <dl className="mt-6">
                    <SummaryRow
                      label={selectedEstate.priceLabel}
                      value={formatNaira(selectedEstate.plotPrice)}
                    />
                    <SummaryRow
                      label="NUMBER OF PLOTS"
                      value={String(plotCount)}
                    />
                    <SummaryRow
                      label="TOTAL PROPERTY VALUE"
                      value={formatNaira(totalPropertyValue)}
                    />
                    <SummaryRow
                      label="DEPOSIT"
                      value={`${Math.round(selectedPlan.depositPercent * 100)}% · ${formatNaira(depositAmount)}`}
                    />
                    <SummaryRow
                      label="REMAINING BALANCE"
                      value={formatNaira(remainingBalance)}
                    />
                    <SummaryRow
                      label="PLAN DURATION"
                      value={selectedPlan.months === 0 ? "Outright payment" : `${selectedPlan.months} months`}
                    />
                    <SummaryRow
                      label="MONTHLY INSTALLMENT"
                      value={
                        selectedPlan.months === 0
                          ? "Not applicable"
                          : formatNaira(monthlyInstallment)
                      }
                    />
                  </dl>

                  <div className="mt-6 rounded-[1.15rem] border border-[#db7a33]/18 bg-black/20 px-4 py-4">
                    <p className="text-[0.74rem] font-semibold tracking-[0.16em] text-[#db7a33]">
                      PLAN NOTE
                    </p>
                    <p className="mt-2 text-[0.92rem] leading-7 text-white/76">
                      {getPaymentPlanDetail(selectedPlan)} This calculator is an
                      estimate and excludes any extra statutory or documentation
                      fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
