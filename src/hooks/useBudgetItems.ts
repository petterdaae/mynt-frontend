import { BudgetItem } from "../types";
import { useCrud } from "./index";

function useBudgetItems() {
  const { elements, loading, addElement, updateElement, deleteElement } =
    useCrud<BudgetItem>(`${process.env.REACT_APP_BACKEND_URL}/budget_items`);

  return {
    budgetItems: elements,
    loading: loading,
    addBudgetItem: addElement,
    deleteBudgetItem: deleteElement,
    updateBudgetItem: updateElement,
  };
}

export default useBudgetItems;
