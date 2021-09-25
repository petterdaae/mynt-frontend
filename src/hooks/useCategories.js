import { useState, useEffect } from "react";

function useCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [setCategories]);
  return categories;
}

export default useCategories;
