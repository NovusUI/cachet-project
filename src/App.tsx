import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import SeoHead from "./components/SeoHead";
import SiteHeader from "./components/SiteHeader";
import VirtualTourPage from "./components/VirtualTourPage";

type AppPath = "/" | "/virtual-tour";

function getCurrentPath(): AppPath {
  return window.location.pathname === "/virtual-tour" ? "/virtual-tour" : "/";
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<AppPath>(getCurrentPath);
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (currentPath !== "/" || pendingSection === null) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (pendingSection === "__top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document
          .getElementById(pendingSection)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      setPendingSection(null);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [currentPath, pendingSection]);

  const navigateToPath = (path: AppPath) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
    }
  };

  const handleNavigateHome = () => {
    if (currentPath === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigateToPath("/");
    setPendingSection("__top");
  };

  const handleNavigateSection = (
    sectionId: "about" | "listing" | "services" | "contact"
  ) => {
    if (currentPath === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigateToPath("/");
    setPendingSection(sectionId);
  };

  const handleNavigateVirtualTour = () => {
    navigateToPath("/virtual-tour");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <SeoHead currentPath={currentPath} />
      <SiteHeader
        currentPath={currentPath}
        onNavigateHome={handleNavigateHome}
        onNavigateSection={handleNavigateSection}
        onNavigateVirtualTour={handleNavigateVirtualTour}
      />
      {currentPath === "/virtual-tour" ? (
        <VirtualTourPage onGoHome={handleNavigateHome} />
      ) : (
        <HomePage />
      )}
    </>
  );
}
