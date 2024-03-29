import { formatDate, mod } from "../utils";

function getDateFromMonth(month: number, day: number): string {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(month / 12);
  const date = new Date(year, mod(month, 12), day);
  return formatDate(date);
}

function getMonthName(monthIndex: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex];
}

export { getDateFromMonth, getMonthName };
