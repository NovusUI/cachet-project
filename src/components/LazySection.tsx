import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

type LazySectionProps = {
  children: ReactNode;
  placeholderClassName?: string;
  rootMargin?: string;
};

export default function LazySection({
  children,
  placeholderClassName = "min-h-[24rem]",
  rootMargin = "900px 0px",
}: LazySectionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={sectionRef}>
      {shouldRender ? (
        <Suspense fallback={<div aria-hidden="true" className={placeholderClassName} />}>
          {children}
        </Suspense>
      ) : (
        <div aria-hidden="true" className={placeholderClassName} />
      )}
    </div>
  );
}
