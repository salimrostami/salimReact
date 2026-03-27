import { Helmet } from "react-helmet-async";

const SITE_URL = "https://doincode.com";
const SITE_NAME = "doincode.com";
const DEFAULT_IMAGE = `${SITE_URL}/projectImages/logoSalimB.png`;
const GOOGLE_SITE_VERIFICATION = process.env.REACT_APP_GOOGLE_SITE_VERIFICATION;
const BING_SITE_VERIFICATION = process.env.REACT_APP_BING_SITE_VERIFICATION;

const PAGE_META = {
  "/": {
    title: "Salim Rostami | professor OPS",
    description:
      "Official website of Salim Rostami, Professor of Operations Management and researcher in mathematical optimization.",
    pageType: "WebPage",
  },
  "/about": {
    title: "Salim Rostami | About",
    description:
      "Background, research profile, and academic information about Salim Rostami.",
    pageType: "AboutPage",
  },
  "/publications": {
    title: "Salim Rostami | Publications",
    description:
      "Selected publications and academic resources by Salim Rostami.",
    pageType: "CollectionPage",
  },
  "/teaching": {
    title: "Salim Rostami | Teaching",
    description:
      "Teaching activities, courses, and learning resources by Salim Rostami.",
    pageType: "CollectionPage",
  },
  "/experience": {
    title: "Salim Rostami | Experience",
    description: "Professional and academic experience of Salim Rostami.",
    pageType: "ProfilePage",
  },
  "/software": {
    title: "Salim Rostami | Software",
    description: "Software products and tools developed by Salim Rostami.",
    pageType: "CollectionPage",
  },
  "/contact": {
    title: "Salim Rostami | Contact",
    description: "Contact details and social channels for Salim Rostami.",
    pageType: "ContactPage",
  },
};

const normalizePath = (pathname) => {
  if (!pathname || pathname === "") {
    return "/";
  }

  if (pathname === "/articles") {
    return "/articles";
  }

  return pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
};

const getCanonicalPath = (pathname) => {
  if (pathname === "/articles") {
    return "/publications";
  }

  return pathname;
};

const getPageMeta = (pathname) => {
  if (pathname === "/articles") {
    return PAGE_META["/publications"];
  }

  return PAGE_META[pathname] || PAGE_META["/"];
};

const SeoHead = ({ location, personalDetails }) => {
  const normalizedPath = normalizePath(location.pathname);
  const canonicalPath = getCanonicalPath(normalizedPath);
  const pageMeta = getPageMeta(normalizedPath);

  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const ogUrl = canonicalUrl;
  const robots =
    normalizedPath === "/articles" ? "noindex, follow" : "index, follow";

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
      {
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
      },
    ],
  };

  return (
    <Helmet>
      <title>{pageMeta.title}</title>
      <meta name="description" content={pageMeta.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageMeta.title} />
      <meta property="og:description" content={pageMeta.description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

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
