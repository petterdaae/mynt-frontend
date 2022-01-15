import { useState, useEffect, useCallback } from "react";
import { useInvalidation } from "./index";

function useBudgetItems() {
  const { budgetItemsChanged, invalidateBudgetItems } = useInvalidation();
  const [budgetItems, setBudgetItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/budget_items`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBudgetItems(data);
        setLoading(false);
      });
  }, [setBudgetItems, budgetItemsChanged]);

  const addBudgetItem = useCallback(
    (newBudgetItem) => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/budget_items`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newBudgetItem),
      }).then(() => {
        invalidateBudgetItems();
      });
    },
    [setBudgetItems, invalidateBudgetItems]
  );

  const updateBudgetItem = useCallback(
    (budgetItem) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/budget_items`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(budgetItem),
      }).then(() => {
        invalidateBudgetItems();
      });
      setBudgetItems((prev) =>
        prev
          .map((b) => (b.id === budgetItem.id ? budgetItem : b))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    },
    [setBudgetItems]
  );

  const deleteBudgetItem = useCallback(
    (budgetItemId) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/budget_items`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          id: budgetItemId,
        }),
      });
      setBudgetItems((prev) => prev.filter((c) => c.id !== budgetItemId));
    },
    [setBudgetItems]
  );

  return {
    budgetItems,
    loading,
    addBudgetItem,
    deleteBudgetItem,
    updateBudgetItem,
  };
}

export default useBudgetItems;
