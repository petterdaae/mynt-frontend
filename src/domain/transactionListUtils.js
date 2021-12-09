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

export { formatDate, formatReadableDate };
