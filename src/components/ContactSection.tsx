import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitContactForm } from "../lib/contactForm";

type ContactItem = {
  label: string;
  value: string;
  icon: "address" | "phone" | "email";
};

const contactItems: ContactItem[] = [
  {
    label: "ADDRESS",
    value: "No 42, Obafemi Awolowo Way, Oke-Bola, Ibadan",
    icon: "address",
  },
  {
    label: "PHONE",
    value: "07045413648 · 09039968345",
    icon: "phone",
  },
  {
    label: "EMAIL",
    value: "Cachetrealtors26@gmail.com",
    icon: "email",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
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
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function ContactIcon({ icon }: { icon: ContactItem["icon"] }) {
  const common = {
    stroke: "#5C2E83",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  if (icon === "phone") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8.3 5.4L9.5 7.9C9.78 8.49 9.67 9.19 9.22 9.66L8.2 10.72C9.06 12.45 10.48 13.87 12.21 14.73L13.27 13.71C13.74 13.26 14.44 13.15 15.03 13.43L17.58 14.65C18.38 15.03 18.8 15.92 18.61 16.78L18.18 18.73C18.02 19.48 17.36 20 16.59 20C9.64 20 4 14.36 4 7.41C4 6.64 4.52 5.98 5.27 5.82L7.22 5.39C8.08 5.2 8.96 5.62 9.35 6.42"
          {...common}
        />
      </svg>
    );
  }

  if (icon === "email") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6.5" width="16" height="11" rx="2.2" {...common} />
        <path d="M5.2 8L12 12.9L18.8 8" {...common} />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20C15.8 15.7 18 12.65 18 9.5C18 6.46 15.54 4 12.5 4C9.46 4 7 6.46 7 9.5C7 12.65 9.2 15.7 13 20H12Z"
        {...common}
      />
      <circle cx="12" cy="9.5" r="1.85" {...common} />
    </svg>
  );
}

function ContactCard({ item }: { item: ContactItem }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 8, transition: { duration: 0.25, ease: "easeOut" } }}
      className="flex items-center gap-4 sm:gap-5"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#6a3896] bg-transparent">
        <ContactIcon icon={item.icon} />
      </div>

      <div>
        <p className="text-[0.82rem] tracking-[0.28em] text-[#a9afb4]">
          {item.label}
        </p>
        <p className="mt-1 text-[1rem] leading-7 text-[#6f6e73] sm:text-[1.08rem]">
          {item.value}
        </p>
      </div>
    </motion.div>
  );
}

function FormField({
  label,
  children,
  fullWidth = false,
}: {
  label: string;
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <motion.label
      variants={itemVariants}
      className={`group block ${fullWidth ? "md:col-span-2" : ""}`}
    >
      <span className="text-[0.85rem] font-semibold tracking-[0.06em] text-[#5C2E83] sm:text-[0.92rem]">
        {label}
      </span>
      <div className="mt-3 border-b border-[#c8d2d7] transition-colors duration-200 group-focus-within:border-[#5C2E83]">
        {children}
      </div>
    </motion.label>
  );
}

function FormStatusToast({
  state,
  message,
  onDismiss,
}: {
  state: "success" | "error";
  message: string;
  onDismiss: () => void;
}) {
  const isSuccess = state === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.985 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
      className={`fixed right-4 bottom-4 z-[110] flex w-[calc(100vw-2rem)] max-w-md items-start gap-3 rounded-[1.15rem] border px-4 py-4 text-sm shadow-[0_20px_40px_rgba(20,13,24,0.18)] backdrop-blur-sm sm:right-6 sm:bottom-6 ${
        isSuccess
          ? "border-[#d7c5e7] bg-[#f7f1fb]/96 text-[#5C2E83]"
          : "border-[#efc3b6] bg-[#fff4f0]/96 text-[#b44f2d]"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isSuccess ? "bg-[#5C2E83] text-white" : "bg-[#b44f2d] text-white"
        }`}
      >
        {isSuccess ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2.3 6.1L4.7 8.5L9.7 3.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M6 3V6.25"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <circle cx="6" cy="8.75" r="0.75" fill="currentColor" />
          </svg>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] opacity-70">
          {isSuccess ? "MESSAGE SENT" : "SUBMISSION FAILED"}
        </p>
        <p className="mt-1 leading-6">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-current/70 transition-colors duration-200 hover:bg-black/5 hover:text-current"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    </motion.div>
  );
}

export default function ContactSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (submitState !== "success" && submitState !== "error") {
      return;
    }

    const timer = window.setTimeout(() => {
      setSubmitState("idle");
      setSubmitMessage("");
    }, 4200);

    return () => window.clearTimeout(timer);
  }, [submitState, submitMessage]);

  const dismissToast = () => {
    setSubmitState("idle");
    setSubmitMessage("");
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName || !phone || !email || !selectedService || !message) {
      setSubmitState("error");
      setSubmitMessage("Please complete the required fields before sending your message.");
      return;
    }

    try {
      setSubmitState("submitting");
      setSubmitMessage("");

      await submitContactForm({
        firstName,
        lastName,
        phone,
        email,
        service: selectedService,
        message,
        siteKey: "cachet-main-site",
        formKey: "primary-contact",
        sourceUrl: window.location.href,
      });

      setSubmitState("success");
      setSubmitMessage("Thanks for reaching out. We'll get back to you shortly.");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setSelectedService("");
      setMessage("");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send your message just now. Please try again shortly."
      );
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#fbf4ee] px-6 py-18 md:px-10 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute top-8 right-[-7rem] h-56 w-56 rounded-full bg-[#e5d3c8]/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-8rem] h-64 w-64 rounded-full bg-[#d8cae4]/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.12fr)] lg:gap-[5.5rem] xl:gap-28">
        <motion.div
          initial={{ opacity: 0, x: -38 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="self-start"
        >
          <span className="text-[0.72rem] font-bold tracking-[0.22em] text-[#db7a33]">
            LET'S TALK
          </span>

          <h2 className="mt-6 max-w-lg text-[2.5rem] font-bold leading-[1.12] tracking-[-0.03em] text-[#4c2776] sm:text-[3.15rem] lg:text-[2.5rem]">
            Ready to Make Your Next Move?
          </h2>

          <p className="mt-6 max-w-xl text-[1.12rem] leading-8 text-[#8a8e92] italic sm:text-[1.28rem] sm:leading-9">
            Whether buying, selling, investing, or building, we're ready to
            help you achieve your real estate goals.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 space-y-8 sm:mt-16 sm:space-y-9"
          >
            {contactItems.map((item) => (
              <ContactCard key={item.label} item={item} />
            ))}
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={handleSendMessage}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="grid gap-x-10 gap-y-9 md:grid-cols-2 md:gap-y-10"
        >
          <FormField label="FIRST NAME">
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="h-11 w-full bg-transparent pb-1 text-[0.98rem] text-[#6a3896] outline-none placeholder:text-[#9a939c]"
            />
          </FormField>

          <FormField label="LAST NAME">
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="h-11 w-full bg-transparent pb-1 text-[0.98rem] text-[#6a3896] outline-none placeholder:text-[#9a939c]"
            />
          </FormField>

          <FormField label="PHONE">
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="h-11 w-full bg-transparent pb-1 text-[0.98rem] text-[#6a3896] outline-none placeholder:text-[#9a939c]"
            />
          </FormField>

          <FormField label="EMAIL">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full bg-transparent pb-1 text-[0.98rem] text-[#6a3896] outline-none placeholder:text-[#9a939c]"
            />
          </FormField>

          <FormField label="SERVICE OF INTEREST" fullWidth>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
                className={`h-11 w-full appearance-none bg-transparent pr-10 pb-1 text-[0.98rem] outline-none ${
                  selectedService ? "text-[#6a3896]" : "text-[#9a939c]"
                }`}
              >
                <option value="" disabled>
                  Select service
                </option>
                <option value="Real Estate Advisory Services">
                  Real Estate Advisory Services
                </option>
                <option value="Property Sales and Acquisition">
                  Property Sales and Acquisition
                </option>
                <option value="Real Estate Investment">
                  Real Estate Investment
                </option>
                <option value="Property and Facility Management">
                  Property and Facility Management
                </option>
                <option value="Project Management">Project Management</option>
                <option value="Property Development">Property Development</option>
                <option value="Building Construction">Building Construction</option>
              </select>
              <svg
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6.5 9.5L12 15L17.5 9.5"
                  stroke="#5C2E83"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </FormField>

          <FormField label="MESSAGE" fullWidth>
            <textarea
              rows={2}
              placeholder="Tell us about your need"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-[58px] w-full resize-none bg-transparent pb-1 text-[0.98rem] text-[#6a3896] outline-none placeholder:text-[#9a939c]"
            />
          </FormField>

          <motion.button
            variants={itemVariants}
            whileHover={{
              y: -3,
              boxShadow: "0 18px 30px rgba(92, 46, 131, 0.18)",
            }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-2 inline-flex h-12 items-center justify-center bg-[#5C2E83] px-8 text-sm font-semibold tracking-[0.08em] text-white disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
            type="submit"
            disabled={submitState === "submitting"}
          >
            {submitState === "submitting" ? "SENDING..." : "SEND MESSAGE"}
          </motion.button>

        </motion.form>
      </div>

      <AnimatePresence>
        {submitMessage && (submitState === "success" || submitState === "error") ? (
          <FormStatusToast
            state={submitState}
            message={submitMessage}
            onDismiss={dismissToast}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
