import projectData from "./teachingData.json";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import "./teaching.css";

const Teaching = () => {
  const getDateRangeInfo = (range) => {
    const years = (range.match(/\d{4}/g) || []).map((year) => Number(year));
    const start = years[0] || 0;
    const hasPresent = /present/i.test(range);
    const end = hasPresent ? new Date().getFullYear() : years[1] || start;

    return { start, end };
  };

  const formatDateRange = (range) => range.replace(/\s*-\s*/g, " to ");

  const formatLevelLocation = (value) => {
    const match = value.match(/^(B\.Sc\.|M\.Sc\.)\s+(.+)$/);
    if (!match) {
      return value;
    }

    return `${match[1]} - ${match[2]}`;
  };

  const sortedCourses = [...projectData].sort((a, b) => {
    const first = getDateRangeInfo(a.top);
    const second = getDateRangeInfo(b.top);

    if (second.end !== first.end) {
      return second.end - first.end;
    }

    if (second.start !== first.start) {
      return second.start - first.start;
    }

    return a.title.localeCompare(b.title);
  });

  const renderLinks = (course) => {
    const links = [];

    if (course.github) {
      links.push({ label: "Repository", url: course.github });
    }

    if (course.deployed) {
      links.push({ label: "Website", url: course.deployed });
    }

    return links.map((link) => (
      <a
        key={`${course.id}-${link.label}`}
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
          {sortedCourses.map((course) => (
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
              <p className="teachingLinks">{renderLinks(course)}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Teaching;
