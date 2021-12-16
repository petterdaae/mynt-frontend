import { useState } from "react";
import { useCategories, useSpendings } from "../../hooks";
import Spending from "./Spending";

function Spendings() {
  const { categories } = useCategories();
  const { spendings } = useSpendings();
  const [currentCategory, setCurrentCategory] = useState(null);
  return (
    <>
      {categories
        .filter((c) => c.parent_id === currentCategory)
        .map((c) => {
          const spending = spendings.find((s) => s.category_id === c.id);
          console.log(spending);
          console.log(setCurrentCategory);
          return <Spending key={c.id} />;
        })}
    </>
  );
}

export default Spendings;
