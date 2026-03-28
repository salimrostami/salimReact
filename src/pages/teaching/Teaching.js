import projectData from "./teachingData.json";
import { useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import { compareDateRangesDesc, formatDateRange } from "../../utils/dateRange";
import { normalizeLinks } from "../../utils/links";
import "./teaching.css";

const Teaching = () => {
  const formatLevelLocation = (value) => {
    if (typeof value !== "string") {
      return "";
    }

    const match = value.match(/^(B\.Sc\.|M\.Sc\.)\s+(.+)$/);
    if (!match) {
      return value;
    }

    return `${match[1]} - ${match[2]}`;
  };

  const sortedCourses = useMemo(
    () =>
      [...projectData].sort((a, b) => {
        const dateComparison = compareDateRangesDesc(a.top, b.top);
        if (dateComparison !== 0) {
          return dateComparison;
        }

        return a.title.localeCompare(b.title);
      }),
    [],
  );

  const renderLinks = (course) => {
    const links = normalizeLinks(course.links);
    if (links.length === 0) {
      return null;
    }

    return links.map((link) => (
      <a
        key={`${course.id}-${link.label}-${link.url}`}
        className="teachingLink"
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
      </a>
    ));
  };

  return (
    <section className="teachingPage">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <PageHeader
          title="Teaching"
          description="Courses and teaching activities"
        />
      </motion.div>
      <motion.div
        className="teachingList"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.12, ease: "easeInOut" }}
      >
        <ul className="teachingBulletList">
          {sortedCourses.map((course) => {
            const courseLinks = renderLinks(course);

            return (
              <li key={course.id} className="teachingEntry">
                <p className="teachingHeadline">
                  <span className="teachingDates">
                    {formatDateRange(course.top)}
                  </span>
                  <span className="teachingSeparator"> - </span>
                  <span className="teachingTitle">{course.title}</span>
                  <span className="teachingSeparator"> - </span>
                  <span className="teachingContext">
                    {formatLevelLocation(course.bottom)}
                  </span>
                </p>
                <p className="teachingDescription">{course.description}</p>
                {courseLinks ? (
                  <p className="teachingLinks">{courseLinks}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
};

export default Teaching;
