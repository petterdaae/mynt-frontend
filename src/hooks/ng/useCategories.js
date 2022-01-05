import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

const CategoriesContext = createContext();

function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }

  return context;
}

function CategoriesProvider(props) {
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
  }, [setCategories]);

  const addCategory = useCallback(
    (newCategory) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newCategory),
      })
        .then((res) => res.json())
        .then((newCategory) =>
          setCategories((prev) =>
            [...prev, newCategory].sort((a, b) => a.name.localeCompare(b.name))
          )
        );
    },
    [setCategories]
  );

  const updateCategory = useCallback(
    (id, updatedCategory) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/${id}`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(updatedCategory),
      })
        .then((res) => res.json())
        .then((updatedCategory) => {
          setCategories((prev) =>
            prev
              .map((category) =>
                category.id === id ? updatedCategory : category
              )
              .sort((a, b) => a.name.localeCompare(b.name))
          );
        });
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
      setCategories((prev) => prev.slice().filter((c) => c.id !== categoryId));
    },
    [setCategories]
  );

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        addCategory,
        deleteCategory,
        updateCategory,
      }}
      {...props}
    />
  );
}

export { useCategories, CategoriesProvider };
