const YEAR_PATTERN = /\d{4}/g;
const PRESENT_PATTERN = /present/i;

export const getDateRangeInfo = (range) => {
  if (typeof range !== "string") {
    return { start: 0, end: 0 };
  }

  const years = (range.match(YEAR_PATTERN) || []).map((year) => Number(year));
  const [start = 0, endFromRange = start] = years;
  const end = PRESENT_PATTERN.test(range) ? new Date().getFullYear() : endFromRange;

  return { start, end };
};

export const compareDateRangesDesc = (firstRange, secondRange) => {
  const first = getDateRangeInfo(firstRange);
  const second = getDateRangeInfo(secondRange);

  if (second.end !== first.end) {
    return second.end - first.end;
  }

  if (second.start !== first.start) {
    return second.start - first.start;
  }

  return 0;
};

export const formatDateRange = (range) => {
  if (typeof range !== "string") {
    return "";
  }

  return range.replace(/\s*-\s*/g, " to ");
};
