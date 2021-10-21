import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { removeCategory } from "../utils/categories";

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
        body: JSON.stringify(
          newCategory
          // {
          //   name,
          //   parent_id,
          //   color
          // }
        ),
      })
        .then((res) => res.json())
        .then((newCategory) => setCategories((prev) => [...prev, newCategory]));
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
      setCategories((prev) => removeCategory(prev, categoryId));
    },
    [setCategories]
  );

  return (
    <CategoriesContext.Provider
      value={{ categories, loading, addCategory, deleteCategory }}
      {...props}
    />
  );
}

export { useCategories, CategoriesProvider };
