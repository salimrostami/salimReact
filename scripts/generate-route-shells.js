const fs = require("fs");
const path = require("path");

const seoConfig = require("../src/seo/seoConfig.json");

const SITE_URL = seoConfig.siteUrl;
const SITE_NAME = seoConfig.siteName;
const DEFAULT_IMAGE = `${SITE_URL}${seoConfig.defaultImagePath}`;
const DEFAULT_LOCALE = seoConfig.defaultLocale || "en_US";
const ROUTES = seoConfig.routes || {};

const buildDir = path.join(process.cwd(), "build");
const indexPath = path.join(buildDir, "index.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("build/index.html not found. Run build before postbuild.");
}

const indexHtml = fs.readFileSync(indexPath, "utf8");

const replaceTag = (html, pattern, replacement) => {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html;
};

const buildHeadTags = (routePath, title, description) => {
  const canonicalUrl = `${SITE_URL}${routePath}`;

  return [
    `<meta name="robots" content="index, follow"/>`,
    `<meta name="googlebot" content="index, follow"/>`,
    `<link rel="canonical" href="${canonicalUrl}"/>`,
    `<link rel="sitemap" type="application/xml" href="${SITE_URL}/sitemap.xml"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="${SITE_NAME}"/>`,
    `<meta property="og:title" content="${title}"/>`,
    `<meta property="og:description" content="${description}"/>`,
    `<meta property="og:url" content="${canonicalUrl}"/>`,
    `<meta property="og:image" content="${DEFAULT_IMAGE}"/>`,
    `<meta property="og:locale" content="${DEFAULT_LOCALE}"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${title}"/>`,
    `<meta name="twitter:description" content="${description}"/>`,
    `<meta name="twitter:image" content="${DEFAULT_IMAGE}"/>`,
  ].join("");
};

const injectRouteMetadata = (html, routePath, meta) => {
  let next = html;
  const headTags = buildHeadTags(routePath, meta.title, meta.description);

  next = replaceTag(
    next,
    /<title>.*?<\/title>/i,
    `<title>${meta.title}</title>`,
  );
  next = replaceTag(
    next,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${meta.description}"/>`,
  );

  next = next.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/gi, "");
  next = next.replace(/<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/gi, "");
  next = next.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, "");
  next = next.replace(
    /<link\s+rel="sitemap"\s+type="application\/xml"\s+href="[^"]*"\s*\/?>/gi,
    "",
  );
  next = next.replace(
    /<meta\s+property="og:[^"]+"\s+content="[^"]*"\s*\/?>/gi,
    "",
  );
  next = next.replace(
    /<meta\s+name="twitter:[^"]+"\s+content="[^"]*"\s*\/?>/gi,
    "",
  );

  next = next.replace("</head>", `${headTags}</head>`);

  if (routePath === "/") {
    return next;
  }

  const routeH1 = `<noscript><h1>${meta.title}</h1><p>This website requires JavaScript to render interactive content.</p></noscript>`;

  return next.replace(/<noscript>[\s\S]*?<\/noscript>/i, routeH1);
};

for (const [routePath, meta] of Object.entries(ROUTES)) {
  const routeHtml = injectRouteMetadata(indexHtml, routePath, meta);

  if (routePath === "/") {
    fs.writeFileSync(indexPath, routeHtml, "utf8");
    continue;
  }

  const targetDir = path.join(buildDir, routePath.replace(/^\//, ""));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), routeHtml, "utf8");
}

console.log("Generated route metadata shells for static crawlers.");
