import { useCallback, useMemo } from "react";
import { BudgetItem } from "../types";
import { useCrud } from "./index";

interface TemporaryBudgetItem {
  id: number;
  budgetId: number;
  categoryId: number;
  monthlyAmount: number | null;
  customItems: string | null;
  kind: string;
  name: string;
}

function useBudgetItems() {
  const { elements, loading, addElement, updateElement, deleteElement } =
    useCrud<TemporaryBudgetItem>(
      `${process.env.REACT_APP_BACKEND_URL}/budget_items`
    );

  const budgetItems = useMemo<BudgetItem[]>(
    () =>
      elements.map((element) => ({
        ...element,
        customItems: element.customItems
          ? JSON.parse(element.customItems)
          : null,
      })),
    [elements]
  );

  const addBudgetItem = useCallback(
    (budgetItem: BudgetItem) =>
      addElement({
        id: budgetItem.id,
        budgetId: budgetItem.budgetId,
        categoryId: budgetItem.categoryId,
        monthlyAmount: budgetItem.monthlyAmount,
        customItems: budgetItem.customItems
          ? JSON.stringify(budgetItem.customItems)
          : null,
        kind: budgetItem.kind,
        name: budgetItem.name,
      }),
    [addElement]
  );

  const updateBudgetItem = useCallback(
    (budgetItem: BudgetItem) =>
      updateElement({
        id: budgetItem.id,
        budgetId: budgetItem.budgetId,
        categoryId: budgetItem.categoryId,
        monthlyAmount: budgetItem.monthlyAmount,
        customItems: budgetItem.customItems
          ? JSON.stringify(budgetItem.customItems)
          : null,
        kind: budgetItem.kind,
        name: budgetItem.name,
      }),
    [updateElement]
  );

  return {
    budgetItems,
    addBudgetItem,
    updateBudgetItem,
    loading,
    deleteBudgetItem: deleteElement,
  };
}

export default useBudgetItems;
