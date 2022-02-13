import Spending from "./Spending";
import { Divider } from "@chakra-ui/react";
import { Spending as SpendingType, Category } from "../../types";

interface Props {
  currentCategory: number | null;
  setCurrentCategory: (id: number) => void;
  spendings: SpendingType[];
  categories: Category[];
}

function SpendingsList({
  currentCategory,
  setCurrentCategory,
  spendings,
  categories,
}: Props) {
  return (
    <>
      {categories
        .filter((category) => category.parentId === currentCategory)
        .map((category) => {
          const spending = spendings.find(
            (s) => s.category?.id === category.id
          );
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
        })}
    </>
  );
}

export default SpendingsList;
