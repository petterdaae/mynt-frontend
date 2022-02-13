import { useCrud } from "./index";
import { Budget } from "../types";

function useBudgets() {
  const { elements, loading, addElement, updateElement, deleteElement } =
    useCrud<Budget>(`${process.env.REACT_APP_BACKEND_URL}/budgets`);

  return {
    budgets: elements,
    loading: loading,
    addBudget: addElement,
    deleteBudget: deleteElement,
    updateBudget: updateElement,
  };
}

export default useBudgets;
