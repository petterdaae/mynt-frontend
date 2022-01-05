import { useCategories } from "../../hooks";
import Spending from "./Spending";
import { Divider } from "@chakra-ui/react";

function SpendingsList({ currentCategory, setCurrentCategory }) {
  const { categories, categoriesLoading } = useCategories();
  const { spendings, spendingsLoading } = useSpendings();
  return (
    !categoriesLoading &&
    !spendingsLoading &&
    categories
      .filter((category) => category.parent_id === currentCategory)
      .map((category) => {
        const spending = spendings.find((s) => s.category_id === category.id);
        return (
          spending && (
            <div key={category.id}>
              <Spending
                spending={spending}
                category={category}
                setCurrentCategory={setCurrentCategory}
              />
              <Divider />
            </div>
          )
        );
      })
  );
}

export default SpendingsList;
