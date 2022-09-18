import { useState, useEffect, useCallback } from "react";
import { Category, DraftCategory } from "../types";

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/categories`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories);
        setLoading(false);
      });
  }, [setCategories, endpoint]);

  const addCategory = useCallback(
    (draftCategory: DraftCategory) => {
      const temporaryId = Math.max(...categories.map((e) => e.id)) + 10;
      setCategories((prev) => [...prev, { ...draftCategory, id: temporaryId }]);
      fetch(endpoint, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(draftCategory),
      })
        .then((res) => res.json())
        .then((res) => {
          setCategories((prev) =>
            prev.map((e) => (e.id === temporaryId ? { ...e, id: res.id } : e))
          );
        });
    },
    [setCategories, endpoint, categories]
  );

  const updateCategory = useCallback(
    (id: number, draftCategory: DraftCategory) => {
      fetch(`${endpoint}/${id}`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(draftCategory),
      });
      setCategories((prev) =>
        prev.map((e) => (e.id === id ? { id, ...draftCategory } : e))
      );
    },
    [endpoint]
  );

  const deleteCategory = useCallback(
    (id: number) => {
      fetch(`${endpoint}/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      setCategories((prev) => prev.filter((e) => e.id !== id));
    },
    [setCategories, endpoint]
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
