import { formatDate } from "../utils";

function setFromAndToDate(month, setFromAndToDate) {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(month / 12);
  const fromDate = new Date(year, month % 12, 1);
  const toDate = new Date(year, (month % 12) + 1, 0);
  setFromAndToDate(formatDate(fromDate), formatDate(toDate));
}

function getFromDateFromMonth(month) {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(month / 12);
  const date = new Date(year, month % 12, 1);
  return formatDate(date);
}

function getToDateFromMonth(month) {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(month / 12);
  const date = new Date(year, (month % 12) + 1, 0);
  return formatDate(date);
}

function getMonthName(monthIndex) {
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

export {
  setFromAndToDate,
  getMonthName,
  getFromDateFromMonth,
  getToDateFromMonth,
};
