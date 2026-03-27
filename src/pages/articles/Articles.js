import PageHeader from "../../components/PageHeader";
import { motion } from "framer-motion";
import publicationsData from "./articles.json";

const Articles = () => {
  const authorToText = (author) => {
    if (!author) {
      return "";
    }

    if (typeof author === "string") {
      return author;
    }

    const first = author.firstName ? author.firstName.trim() : "";
    const last = author.lastName ? author.lastName.trim() : "";

    return [last, first].filter(Boolean).join(", ");
  };

  const formatPeopleList = (people) => {
    const names = (people || []).map(authorToText).filter(Boolean);
    if (names.length === 0) {
      return "";
    }

    if (names.length === 1) {
      return names[0];
    }

    if (names.length === 2) {
      return `${names[0]} and ${names[1]}`;
    }

    return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
  };

  const getMetadataBlocks = (entry) => {
    const blocks = [];

    if (entry.journal) {
      let journalBlock = entry.journal;

      if (entry.volume) {
        journalBlock += ` ${entry.volume}`;
      }

      if (entry.issue) {
        journalBlock += `(${entry.issue})`;
      }

      blocks.push(journalBlock);
    }

    if (entry.conference) {
      blocks.push(`In: ${entry.conference}`);
    }

    if (entry.pages) {
      blocks.push(`pp. ${entry.pages}`);
    }

    if (entry.reportNumber) {
      blocks.push(`Tech. rep. ${entry.reportNumber}`);
    }

    if (entry.degree) {
      blocks.push(entry.degree);
    }

    if (entry.institution) {
      blocks.push(entry.institution);
    }

    if (entry.supervisors && entry.supervisors.length > 0) {
      blocks.push(`Supervisors: ${formatPeopleList(entry.supervisors)}`);
    }

    if (entry.supervisedBy && entry.supervisedBy.length > 0) {
      blocks.push(`Supervised by ${formatPeopleList(entry.supervisedBy)}`);
    }

    if (entry.issn) {
      blocks.push(`issn: ${entry.issn}`);
    }

    return blocks;
  };

  const buildCitation = (entry) => {
    if (entry.citation) {
      return entry.citation;
    }

    const authors = formatPeopleList(entry.authors);
    const year = entry.year ? `(${entry.year})` : "";
    const title = entry.title ? `"${entry.title}"` : "";
    const header = [authors, year, title].filter(Boolean).join(" ");
    const blocks = getMetadataBlocks(entry);
    const body = blocks.join(". ");

    if (!header && !body) {
      return "";
    }

    if (!body) {
      return `${header}.`;
    }

    if (!header) {
      return `${body}.`;
    }

    return `${header}. ${body}.`;
  };

  const getLinks = (entry) => {
    if (Array.isArray(entry.links)) {
      return entry.links;
    }

    const linkMap = entry.links || {};
    const orderedLinkKeys = [
      { key: "pdf", label: "PDF" },
      { key: "doi", label: "DOI" },
      { key: "online", label: "Online" },
      { key: "repository", label: "Repository" },
      { key: "exeInstances", label: "EXE & Instances" },
      { key: "results", label: "Results" },
      { key: "slides", label: "Slides" },
      { key: "paper", label: "Paper" },
      { key: "paperSlides", label: "Paper-Slides" },
    ];

    return orderedLinkKeys
      .filter((item) => Boolean(linkMap[item.key]))
      .map((item) => ({ label: item.label, url: linkMap[item.key] }));
  };

  const renderLinks = (links, group) =>
    links.map((link) => (
      <a
        key={`${group}-${link.label}`}
        className="articleLink"
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
      </a>
    ));

  return (
    <section className="articlesPage">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <PageHeader
          title="Publications"
          description="Selected publications and resources"
        />
      </motion.div>

      <motion.section
        className="copyrightNotice"
        aria-label="Copyright notice"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.08, ease: "easeInOut" }}
      >
        <p>{publicationsData.notice}</p>
      </motion.section>

      {publicationsData.categories.map((category, index) => (
        <motion.div
          key={category.id}
          className="articlesSection"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.45,
            delay: 0.14 + index * 0.06,
            ease: "easeInOut",
          }}
        >
          <h4 className="articlesCategoryTitle">{category.title}</h4>
          <div className="articlesList">
            {category.entries.map((entry) => (
              <article key={entry.id} className="articleEntry">
                <p className="articleText">
                  <span className="articleCitation">
                    {buildCitation(entry)}
                  </span>
                  <span className="articleLinkGroup">
                    {renderLinks(getLinks(entry), entry.id)}
                  </span>
                </p>
                {entry.extraInfo ? (
                  <p className="articleExtraInfo">
                    <span className="articleCitation">
                      {entry.extraInfo.text}
                    </span>
                    <span className="articleLinkGroup">
                      {renderLinks(
                        getLinks(entry.extraInfo),
                        `${entry.id}-extra`,
                      )}
                    </span>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default Articles;
