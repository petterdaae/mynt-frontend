import { useState, useEffect, useCallback } from "react";
import { useInvalidation } from "./index";

function useCategorizations() {
  const { categorizationsChanged, invalidateCategorizations } =
    useInvalidation();
  const [categorizations, setCategorizations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categorizations`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategorizations(data);
        setLoading(false);
      });
  }, [setCategorizations, categorizationsChanged]);

  const updateCategorizationsForTransaction = useCallback(
    (transaction, categoryId) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/categorizations`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          transaction_id: transaction.id,
          categorizations: [
            {
              category_id: categoryId,
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
