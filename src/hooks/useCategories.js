import { useState, useEffect, useContext, createContext } from "react";

const CategoriesContext = createContext();

function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }

  return context;
}

function CategoriesProvider(props) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [setCategories]);
  return <CategoriesContext.Provider value={[categories]} {...props} />;
}

export { useCategories, CategoriesProvider };
