import { useCrud } from "./index";

function useCategories() {
  const { elements, loading, addElement, updateElement, deleteElement } =
    useCrud(`${process.env.REACT_APP_BACKEND_URL}/categories`);

  return {
    categories: elements,
    loading: loading,
    addCategory: addElement,
    deleteCategory: deleteElement,
    updateCategory: updateElement,
  };
}

export default useCategories;