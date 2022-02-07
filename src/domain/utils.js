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
  const formatted = `${(amount / 100).toLocaleString().replace(",", " ")}`;
  if (formatted.indexOf(".") === -1) {
    return formatted + ".00";
  }
  if (formatted.indexOf(".") === formatted.length - 2) {
    return formatted + "0";
  }

  return formatted;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

export { formatDate, formatReadableDate, formatCurrency, mod };
