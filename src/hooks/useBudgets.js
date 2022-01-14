import { useState, useEffect, useCallback } from "react";
import { useInvalidation } from "./index";

function useBudgets() {
  const { budgetsChanged, invalidateBudgets } = useInvalidation();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/budgets`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data);
        setLoading(false);
      });
  }, [setBudgets, budgetsChanged]);

  const addBudget = useCallback(
    (newBudget) => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/budgets`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newBudget),
      }).then(() => {
        invalidateBudgets();
      });
    },
    [setBudgets, invalidateBudgets]
  );

  const updateBudget = useCallback(
    (budget) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/budgets`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(budget),
      }).then(() => {
        invalidateBudgets();
      });
      setBudgets((prev) =>
        prev
          .map((b) => (b.id === budget.id ? budget : b))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    },
    [setBudgets]
  );

  const deleteBudget = useCallback(
    (budgetId) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/budgets`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          id: budgetId,
        }),
      });
      setBudgets((prev) => prev.filter((c) => c.id !== budgetId));
    },
    [setBudgets]
  );

  return {
    budgets,
    loading,
    addBudget,
    deleteBudget,
    updateBudget,
  };
}

export default useBudgets;
