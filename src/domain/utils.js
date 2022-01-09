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
  const integer = Math.floor(amount / 100);
  let decimal = Math.abs(amount % 100);

  if (decimal < 10) {
    decimal = `0${decimal}`;
  }

  return `${integer.toLocaleString().replace(",", " ")},${decimal}`;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

export { formatDate, formatReadableDate, formatCurrency, mod };
