const fs = require("fs");
const path = require("path");

const SITE_URL = "https://doincode.com";
const SITE_NAME = "doincode.com";
const DEFAULT_IMAGE = `${SITE_URL}/projectImages/logoSalimB.png`;

const ROUTES = {
  "/": {
    title: "Salim Rostami | Professor",
    description:
      "Official website of Salim Rostami, Professor of Operations Management and researcher in mathematical optimization.",
  },
  "/about": {
    title: "Salim Rostami | About",
    description:
      "Background, research profile, and academic information about Salim Rostami.",
  },
  "/publications": {
    title: "Salim Rostami | Publications",
    description:
      "Selected publications and academic resources by Salim Rostami.",
  },
  "/teaching": {
    title: "Salim Rostami | Teaching",
    description:
      "Teaching activities, courses, and learning resources by Salim Rostami.",
  },
  "/experience": {
    title: "Salim Rostami | Experience",
    description: "Professional and academic experience of Salim Rostami.",
  },
  "/software": {
    title: "Salim Rostami | Software",
    description: "Software products and tools developed by Salim Rostami.",
  },
  "/contact": {
    title: "Salim Rostami | Contact",
    description: "Contact details and social channels for Salim Rostami.",
  },
};

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
    `<link rel="canonical" href="${canonicalUrl}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="${SITE_NAME}"/>`,
    `<meta property="og:title" content="${title}"/>`,
    `<meta property="og:description" content="${description}"/>`,
    `<meta property="og:url" content="${canonicalUrl}"/>`,
    `<meta property="og:image" content="${DEFAULT_IMAGE}"/>`,
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
  next = next.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, "");
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
