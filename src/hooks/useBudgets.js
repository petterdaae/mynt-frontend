import { useCrud } from "./index";

function useBudgets() {
  const { elements, loading, addElement, updateElement, deleteElement } =
    useCrud(`${process.env.REACT_APP_BACKEND_URL}/budgets`);

  return {
    budgets: elements,
    loading: loading,
    addBudget: addElement,
    deleteBudget: deleteElement,
    updateBudget: updateElement,
  };
}

export default useBudgets;
