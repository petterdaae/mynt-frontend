import { useState, useCallback, useEffect } from "react";

function useTransactions(fromDate, toDate) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/transactions?from_date=${fromDate}&to_date=${toDate}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      });
  }, [setLoading, fromDate, toDate, setTransactions]);

  const update = useCallback(
    (transaction) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          id: transaction.id,
          customDate: transaction.customDate,
        }),
      });

      setTransactions((prev) =>
        prev
          .map((t) => (t.id === transaction.id ? transaction : t))
          .filter(
            (t) =>
              (t.customDate ?? t.accountingDate) >= fromDate &&
              (t.customDate ?? t.accountingDate) <= toDate
          )
          .sort((a, b) => {
            const aDate = a.customDate ?? a.accountingDate;
            const bDate = b.customDate ?? b.accountingDate;
            return aDate === bDate ? a.id - b.id : aDate >= bDate ? -1 : 1;
          })
      );
    },
    [fromDate, toDate]
  );

  return {
    transactions,
    loading,
    update,
  };
}

export default useTransactions;
