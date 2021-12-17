import { formatDate } from "../utils";

function setSpendingsFromAndToDate(month, setFromAndToDate) {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(month / 12);
  const fromDate = new Date(year, month % 12, 1);
  const toDate = new Date(year, (month % 12) + 1, 0);
  setFromAndToDate(formatDate(fromDate), formatDate(toDate));
}

export { setSpendingsFromAndToDate };