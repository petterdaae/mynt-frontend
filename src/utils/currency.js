function formatCurrency(amount) {
  const integer = Math.floor(amount / 100);
  let decimal = Math.abs(amount % 100);

  if (decimal < 10) {
    decimal = `0${decimal}`;
  }

  return `${integer},${decimal}`;
}

export { formatCurrency };
