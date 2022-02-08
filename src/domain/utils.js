const formatDate = (date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

const formatReadableDate = (datetime) => {
  const date = new Date(datetime);
  const month = date.toLocaleString("default", { month: "long" });
  return date.getDate() + ". " + month;
};

function formatCurrency(amount) {
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

function mod(n, m) {
  return ((n % m) + m) % m;
}

export { formatDate, formatReadableDate, formatCurrency, mod };
