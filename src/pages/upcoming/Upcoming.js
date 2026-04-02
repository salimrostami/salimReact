import { useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import upcomingData from "./upcomingData.json";
import "./upcoming.css";

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const MONTH_FORMATTER = new Intl.DateTimeFormat("en", {
  month: "long",
});

const parseIsoDate = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  const match = value.match(ISO_DATE_PATTERN);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate;
};

const formatFullDate = (date) =>
  `${date.getDate()} ${MONTH_FORMATTER.format(date)} ${date.getFullYear()}`;

const formatDateRange = (startDate, endDate) => {
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = MONTH_FORMATTER.format(startDate);
  const endMonth = MONTH_FORMATTER.format(endDate);
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startDate.getTime() === endDate.getTime()) {
    return formatFullDate(startDate);
  }

  if (startYear === endYear && startMonth === endMonth) {
    return `${startDay}-${endDay} ${startMonth} ${startYear}`;
  }

  if (startYear === endYear) {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
  }

  return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
};

const Upcoming = () => {
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return upcomingData
      .map((event) => {
        const startDate = parseIsoDate(event.starting);
        const endDate = parseIsoDate(event.ending);
        const submissionDate = parseIsoDate(event.submissionDeadline);

        return {
          ...event,
          startDate,
          endDate,
          submissionDate,
        };
      })
      .filter(
        (event) => event.startDate && event.endDate && event.endDate >= today,
      )
      .sort((first, second) => {
        if (first.startDate.getTime() !== second.startDate.getTime()) {
          return first.startDate.getTime() - second.startDate.getTime();
        }

        if (first.endDate.getTime() !== second.endDate.getTime()) {
          return first.endDate.getTime() - second.endDate.getTime();
        }

        return first.name.localeCompare(second.name);
      });
  }, []);

  return (
    <section className="upcomingPage">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <PageHeader
          title="Upcoming"
          description="Conferences and events I may participate in"
        />
      </motion.div>
      <motion.div
        className="upcomingList"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.12, ease: "easeInOut" }}
      >
        {upcomingEvents.length > 0 ? (
          <ul className="upcomingBulletList">
            {upcomingEvents.map((event) => (
              <li
                key={`${event.name}-${event.starting}-${event.ending}`}
                className="upcomingEntry"
              >
                <p className="upcomingDatesLine">
                  {formatDateRange(event.startDate, event.endDate)}
                </p>
                <p className="upcomingTitleLine">{event.name}</p>
                <p className="upcomingLocationLine">
                  {event.location || "Location TBA"}
                </p>
                {event.submissionDate ? (
                  <p className="upcomingMeta">
                    <span className="upcomingMetaLabel">
                      Submission deadline:
                    </span>{" "}
                    <span className="upcomingDeadline">
                      {formatFullDate(event.submissionDate)}
                    </span>
                  </p>
                ) : null}
                {event.link ? (
                  <p className="upcomingLinks">
                    <a
                      className="upcomingLink"
                      href={event.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Event page
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="upcomingEmpty">
            No upcoming events are currently listed.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Upcoming;
