import experienceData from "./experienceData.json";
import { useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import { compareDateRangesDesc, formatDateRange } from "../../utils/dateRange";
import { normalizeLinks } from "../../utils/links";
import "./experience.css";

const Experience = () => {
  const sortedExperience = useMemo(
    () =>
      [...experienceData].sort((a, b) => {
        const dateComparison = compareDateRangesDesc(a.period, b.period);
        if (dateComparison !== 0) {
          return dateComparison;
        }

        return a.title.localeCompare(b.title);
      }),
    [],
  );

  const renderLinks = (item) => {
    const links = normalizeLinks(item.links);
    if (links.length === 0) {
      return null;
    }

    return links.map((link) => (
      <a
        key={`${item.id}-${link.label}-${link.url}`}
        className="experienceLink"
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
      </a>
    ));
  };

  return (
    <section className="experiencePage">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <PageHeader
          title="Experience"
          description="Professional and academic trajectory"
        />
      </motion.div>
      <motion.div
        className="experienceList"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.12, ease: "easeInOut" }}
      >
        <ul className="experienceBulletList">
          {sortedExperience.map((item) => {
            const itemLinks = renderLinks(item);

            return (
              <li key={item.id} className="experienceEntry">
                <div className="experienceRow">
                  <div className="experienceMain">
                    <p className="experienceHeadline">
                      <span className="experienceDates">
                        {formatDateRange(item.period)}
                      </span>
                      <span className="experienceSeparator"> - </span>
                      <span className="experienceTitle">{item.title}</span>
                      <span className="experienceSeparator"> - </span>
                      <span className="experienceContext">
                        {item.institution}
                      </span>
                    </p>
                    {item.focus ? (
                      <p className="experienceDescription">{item.focus}</p>
                    ) : null}
                    {item.details ? (
                      <p className="experienceDescription">{item.details}</p>
                    ) : null}
                    {itemLinks ? (
                      <p className="experienceLinks">{itemLinks}</p>
                    ) : null}
                  </div>
                  {item.logo ? (
                    <div className="experienceLogoWrap" aria-hidden="true">
                      <img
                        className="experienceLogo"
                        src={`/logoImages/${item.logo}`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
};

export default Experience;
