import { useCrud } from "./index";

function useBudgetItems() {
  const { elements, loading, addElement, updateElement, deleteElement } =
    useCrud(`${process.env.REACT_APP_BACKEND_URL}/budgetItems`);

  return {
    budgetItems: elements,
    loading: loading,
    addBudgetItem: addElement,
    deleteBudgetItem: deleteElement,
    updateBudgetItem: updateElement,
  };
}

export default useBudgetItems;
