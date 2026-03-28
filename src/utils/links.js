const hasText = (value) => typeof value === "string" && value.trim() !== "";

export const normalizeLinks = (links) => {
  if (!links) {
    return [];
  }

  if (Array.isArray(links)) {
    return links
      .filter(
        (link) =>
          link &&
          typeof link === "object" &&
          hasText(link.label) &&
          hasText(link.url),
      )
      .map((link) => ({
        label: link.label.trim(),
        url: link.url.trim(),
      }));
  }

  if (typeof links !== "object") {
    return [];
  }

  return Object.entries(links)
    .filter(([label, url]) => hasText(label) && hasText(url))
    .map(([label, url]) => ({
      label: label.trim(),
      url: url.trim(),
    }));
};
