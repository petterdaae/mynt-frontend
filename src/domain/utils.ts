const formatDate = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

const formatReadableDate = (datetime: string) => {
  const date = new Date(datetime);
  const month = date.toLocaleString("default", { month: "long" });
  return date.getDate() + ". " + month;
};

function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
  });
  const formatted = `${formatter
    .format(amount / 100)
    .replace("kr", "")
    .replace(",", ".")
    .replace("−", "-")
    .trim()}`;
  return formatted;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function monthNameFromIndex(index: number) {
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
  return months[index];
}

export {
  formatDate,
  formatReadableDate,
  formatCurrency,
  mod,
  monthNameFromIndex,
};
