import { Helmet } from "react-helmet-async";
import seoConfig from "../seo/seoConfig.json";

const SITE_URL = seoConfig.siteUrl;
const SITE_NAME = seoConfig.siteName;
const DEFAULT_IMAGE = `${SITE_URL}${seoConfig.defaultImagePath}`;
const DEFAULT_LOCALE = seoConfig.defaultLocale || "en_US";
const PAGE_META = seoConfig.routes || {};
const ROUTE_ALIASES = seoConfig.routeAliases || {};
const GOOGLE_SITE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
const BING_SITE_VERIFICATION = import.meta.env.VITE_BING_SITE_VERIFICATION;

const normalizePath = (pathname) => {
  if (!pathname || pathname === "") {
    return "/";
  }

  return pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
};

const getCanonicalPath = (pathname) => ROUTE_ALIASES[pathname] || pathname;

const getPageMeta = (pathname) => {
  const canonicalPath = getCanonicalPath(pathname);
  return PAGE_META[canonicalPath] || PAGE_META["/"];
};

const isAliasedPath = (pathname) => ROUTE_ALIASES[pathname] !== undefined;

const SeoHead = ({ location, personalDetails }) => {
  const normalizedPath = normalizePath(location.pathname);
  const canonicalPath = getCanonicalPath(normalizedPath);
  const pageMeta = getPageMeta(normalizedPath);
  const robots = isAliasedPath(normalizedPath)
    ? "noindex, follow"
    : "index, follow";

  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const isProfilePage = pageMeta.pageType === "ProfilePage";

  const pageNode = {
    "@type": pageMeta.pageType,
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: pageMeta.title,
    description: pageMeta.description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en",
  };

  if (isProfilePage) {
    pageNode.mainEntity = {
      "@id": `${SITE_URL}/#person`,
      "@type": "Person",
      name: personalDetails.name,
    };
  }

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: personalDetails.name,
        url: SITE_URL,
        jobTitle: "Professor of Operations Management",
        affiliation: {
          "@type": "Organization",
          name: personalDetails.affiliation,
        },
        sameAs: [
          "https://www.linkedin.com/in/salim-rostami-96897431/",
          "https://github.com/salimrostami",
          "https://www.researchgate.net/profile/Salim-Rostami",
          "https://www.instagram.com/salimrostami/",
        ],
      },
      pageNode,
    ],
  };

  return (
    <Helmet>
      <title>{pageMeta.title}</title>
      <meta name="description" content={pageMeta.description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="author" content={personalDetails.name} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="sitemap" type="application/xml" href={`${SITE_URL}/sitemap.xml`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageMeta.title} />
      <meta property="og:description" content={pageMeta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:locale" content={DEFAULT_LOCALE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageMeta.title} />
      <meta name="twitter:description" content={pageMeta.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {GOOGLE_SITE_VERIFICATION ? (
        <meta
          name="google-site-verification"
          content={GOOGLE_SITE_VERIFICATION}
        />
      ) : null}
      {BING_SITE_VERIFICATION ? (
        <meta name="msvalidate.01" content={BING_SITE_VERIFICATION} />
      ) : null}

      <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
    </Helmet>
  );
};

export default SeoHead;
