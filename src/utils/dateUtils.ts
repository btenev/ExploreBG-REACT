import { format } from "date-fns";

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

export const formatDateToDDMMMYYYY = (inputDate: string) => {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) return inputDate;

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
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
  return format(date, "d MMMM yyyy -- HH:mm:ss");
};
