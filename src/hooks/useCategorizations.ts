import { useState, useEffect, useCallback } from "react";
import { Categorization } from "../types";

function useCategorizations(fromDate: string, toDate: string) {
  const [categorizations, setCategorizations] = useState<Categorization[]>([]);
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
    (transaction, newCategorizations: Categorization[]) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/categorizations`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          transactionId: transaction.id,
          categorizations: newCategorizations.map((c) => ({
            categoryId: c.categoryId,
            amount: c.amount,
          })),
        }),
      });
      setCategorizations((prev) => [
        ...prev.filter((c) => c.transactionId !== transaction.id),
        ...newCategorizations.map((c) => ({
          id: c.id,
          amount: c.amount,
          transactionId: transaction.id,
          categoryId: c.categoryId,
        })),
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
