import { useState, useEffect, useCallback } from "react";

function useCategorizations(fromDate, toDate) {
  const [categorizations, setCategorizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categorizations?from_date=${fromDate}&to_date=${toDate}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCategorizations(data);
        setLoading(false);
      });
  }, [setCategorizations, fromDate, toDate]);

  const updateCategorizationsForTransaction = useCallback(
    (transaction, categoryId) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/categorizations`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          transactionId: transaction.id,
          categorizations: [
            {
              categoryId: categoryId,
              amount: transaction.amount,
            },
          ],
        }),
      });
      setCategorizations((prev) => [
        ...prev.filter((c) => c.transactionId !== transaction.id),
        {
          categoryId: categoryId,
          transactionId: transaction.id,
          amount: transaction.amount,
        },
      ]);
    },
    [setCategorizations]
  );

  return {
    categorizations,
    loading,
    updateCategorizationsForTransaction,
  };
}

export default useCategorizations;
