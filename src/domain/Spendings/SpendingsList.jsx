import { useCategories, useSpendings } from "../../hooks";
import Spending from "./Spending";
import { Divider } from "@chakra-ui/react";

function SpendingsList({ currentCategory, setCurrentCategory }) {
  const { categories } = useCategories();
  const { spendings } = useSpendings();
  return categories
    .filter((category) => category.parent_id === currentCategory)
    .map((category) => {
      const spending = spendings.find(
        (spending) => spending.category_id === category.id
      );
      return (
        <div key={category.id}>
          <Spending
            spending={spending}
            category={category}
            setCurrentCategory={setCurrentCategory}
          />
          <Divider />
        </div>
      );
    });
}

export default SpendingsList;
