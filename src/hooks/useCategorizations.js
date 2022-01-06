import { useState, useEffect, useCallback } from "react";
import { useInvalidation } from "./index";

function useCategorizations(fromDate, toDate) {
  const { categorizationsChanged, invalidateCategorizations } =
    useInvalidation();
  const [categorizations, setCategorizations] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [setCategorizations, categorizationsChanged, fromDate, toDate]);

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
      }).then(() => {
        invalidateCategorizations();
      });
    },
    [invalidateCategorizations]
  );

  return {
    categorizations,
    loading,
    updateCategorizationsForTransaction,
  };
}

export default useCategorizations;
