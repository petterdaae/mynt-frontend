import { useState, useEffect, useCallback } from "react";
import { useInvalidation } from "./index";

function useCategories() {
  const { categoriesChanged, invalidateCategories } = useInvalidation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, [setCategories, categoriesChanged]);

  const addCategory = useCallback(
    (newCategory) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newCategory),
      }).then(() => {
        invalidateCategories();
      });
      setCategories((prev) =>
        [...prev, newCategory].sort((a, b) => a.name.localeCompare(b.name))
      );
    },
    [setCategories, invalidateCategories]
  );

  const updateCategory = useCallback(
    (category) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(category),
      }).then(() => {
        invalidateCategories();
      });
      setCategories((prev) =>
        prev
          .map((c) => (c.id === category.id ? category : c))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    },
    [setCategories]
  );

  const deleteCategory = useCallback(
    (categoryId) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          id: categoryId,
        }),
      });
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    },
    [setCategories]
  );

  return {
    categories,
    loading,
    addCategory,
    deleteCategory,
    updateCategory,
  };
}

export default useCategories;
