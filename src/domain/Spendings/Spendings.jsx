import { useState } from "react";
import { useCategories, useSpendings } from "../../hooks";
import Spending from "./Spending";
import TransactionList from "../TransactionList/TransactionList";
import { Divider } from "@chakra-ui/react";

function Spendings() {
  const { categories } = useCategories();
  const { spendings } = useSpendings();
  const [currentCategory, setCurrentCategory] = useState(null);
  return (
    <>
      {categories
        .filter((category) => category.parent_id === currentCategory)
        .map((category) => {
          const spending = spendings.find(
            (spending) => spending.category_id === category.id
          );
          console.log(setCurrentCategory);
          return (
            <div key={category.id}>
              <Spending spending={spending} category={category} />
              <Divider />
            </div>
          );
        })}
      <TransactionList categoryId={currentCategory} />
    </>
  );
}

export default Spendings;
