import { useEffect } from "react";

type AppPath = "/" | "/virtual-tour";

type SeoHeadProps = {
  currentPath: AppPath;
};

type SeoConfig = {
  title: string;
  description: string;
  pathname: string;
  image: string;
};

const homeImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85";
const virtualTourImage =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800&auto=format&fit=crop&q=80";

function upsertMeta(
  selector: string,
  attributeName: "name" | "property",
  attributeValue: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertStructuredData(id: string, payload: object | object[]) {
  let element = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.setAttribute("data-seo-id", id);
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(payload);
}

function getSeoConfig(currentPath: AppPath): SeoConfig {
  if (currentPath === "/virtual-tour") {
    return {
      title: "Virtual Tour | Cachet Realtors Limited",
      description:
        "Preview upcoming immersive property walkthroughs from Cachet Realtors Limited and explore premium real estate experiences remotely.",
      pathname: "/virtual-tour",
      image: virtualTourImage,
    };
  }

  return {
    title: "Cachet Realtors Limited | Premium Real Estate in Ibadan & Lagos",
    description:
      "Cachet Realtors Limited delivers premium land, property advisory, sales, investment, facility management, development, and construction services across Nigeria.",
    pathname: "/",
    image: homeImage,
  };
}

export default function SeoHead({ currentPath }: SeoHeadProps) {
  useEffect(() => {
    const config = getSeoConfig(currentPath);
    const configuredSiteUrl =
      import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://cachetrealtorsng.com";
    const runtimeOrigin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : configuredSiteUrl;
    const canonicalBase = configuredSiteUrl || runtimeOrigin;
    const canonicalUrl = new URL(config.pathname, canonicalBase).toString();
    const hostname =
      typeof window !== "undefined" ? window.location.hostname.toLowerCase() : "";
    const isPreviewHost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".vercel.app");
    const robotsContent = isPreviewHost ? "noindex, nofollow" : "index, follow";

    document.title = config.title;
    document.documentElement.lang = "en";

    upsertMeta('meta[name="description"]', "name", "description", config.description);
    upsertMeta('meta[name="robots"]', "name", "robots", robotsContent);
    upsertMeta('meta[name="theme-color"]', "name", "theme-color", "#5C2E83");
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", "Cachet Realtors Limited");
    upsertMeta('meta[property="og:title"]', "property", "og:title", config.title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", config.description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", config.image);
    upsertMeta(
      'meta[property="og:image:alt"]',
      "property",
      "og:image:alt",
      "Cachet Realtors Limited premium real estate showcase"
    );
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", config.title);
    upsertMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      config.description
    );
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", config.image);
    upsertLink("canonical", canonicalUrl);

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Cachet Realtors Limited",
      url: canonicalBase,
      logo: new URL("/cachet-og-logo.png", canonicalBase).toString(),
      image: homeImage,
      description:
        "Premium real estate advisory, acquisition, investment, management, development, and construction services across Nigeria.",
      telephone: "+2347045413648",
      email: "Cachetrealtors26@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No 42, Obafemi Awolowo Way, Oke-Bola",
        addressLocality: "Ibadan",
        addressCountry: "NG",
      },
      areaServed: ["Ibadan", "Lagos", "Nigeria"],
      sameAs: [
        "https://www.facebook.com/CachetRealtorsLimited",
        "https://www.instagram.com/cachetrealtors/",
        "https://www.tiktok.com/@cachet.realtors",
      ],
    };

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: config.title,
      description: config.description,
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "Cachet Realtors Limited",
        url: canonicalBase,
      },
    };

    upsertStructuredData("cachet-structured-data", [organizationSchema, webPageSchema]);
  }, [currentPath]);

  return null;
}
