import experienceData from "./experienceData.json";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import "./experience.css";

const Experience = () => {
  const getDateRangeInfo = (range) => {
    const years = (range.match(/\d{4}/g) || []).map((year) => Number(year));
    const start = years[0] || 0;
    const hasPresent = /present/i.test(range);
    const end = hasPresent ? new Date().getFullYear() : years[1] || start;

    return { start, end };
  };

  const formatDateRange = (range) => range.replace(/\s*-\s*/g, " to ");

  const sortedExperience = [...experienceData].sort((a, b) => {
    const first = getDateRangeInfo(a.period);
    const second = getDateRangeInfo(b.period);

    if (second.end !== first.end) {
      return second.end - first.end;
    }

    if (second.start !== first.start) {
      return second.start - first.start;
    }

    return a.title.localeCompare(b.title);
  });

  const renderLinks = (item) => {
    const links = item.links || [];

    return links.map((link) => (
      <a
        key={`${item.id}-${link.label}`}
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
          {sortedExperience.map((item) => (
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
                  <p className="experienceLinks">{renderLinks(item)}</p>
                </div>
                {item.logo ? (
                  <div className="experienceLogoWrap" aria-hidden="true">
                    <img
                      className="experienceLogo"
                      src={`/logoImages/${item.logo}`}
                      alt=""
                    />
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Experience;
