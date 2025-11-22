import * as Sentry from "@sentry/react";
import { format, parse, isValid } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatEntityLastUpdate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = format(date, "HH:mm");
  const sameYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
    return time;
  } else if (sameYear) {
    return format(date, "dd MMM HH:mm");
  } else {
    return format(date, "dd MMM yyyy HH:mm");
  }
};

export const formatDate = (inputDate: string | null): string | null => {
  if (!inputDate || typeof inputDate !== "string") return null;

  const parts = inputDate.split("-");
  if (parts.length !== 3) return null;

  const [year, monthNumber, day] = parts;
  const date = new Date();
  date.setMonth(Number(monthNumber) - 1);
  const month = date.toDateString().split(" ")[1];

  return `${day} ${month} ${year}`;
};

export const formatFullDate = (input: string): string => {
  const date = new Date(input);
  const { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions();

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(date);
};

// 1. Accept any valid ISO8601 date
export const isValidIsoDate = (value: string): boolean => {
  const isoWithMinutesRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(Z)?$/;

  if (!isoWithMinutesRegex.test(value)) {
    Sentry.addBreadcrumb({
      category: "date-validation",
      message: "ISO regex failed",
      level: "warning",
      data: { value },
    });
    return false;
  }

  const date = new Date(value);
  const isValid = !isNaN(date.getTime());

  if (!isValid) {
    Sentry.captureMessage("Parsed date is invalid", {
      level: "warning",
      extra: { value },
    });
  }

  return isValid;
};

// 2. Convert UTC ISO → "yyyy-MM-ddTHH:mm" (for <input type="datetime-local">)
export const toDatetimeLocal = (utcString: string): string => {
  const localDate = toZonedTime(
    utcString,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  return format(localDate, "yyyy-MM-dd'T'HH:mm");
};

// 3. Parse local datetime string → real JS date (local time)
export const parseToLocalDatetime = (localString: string): Date | null => {
  const date = parse(localString, "yyyy-MM-dd'T'HH:mm", new Date());
  return isValid(date) ? date : null;
};
