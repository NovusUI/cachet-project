import { useEffect, useState } from "react";

export function useHoverSupport() {
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasHover(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setHasHover(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return hasHover;
}
