import { useCategories } from "../../hooks";
import { useState } from "react";
import Category from "./Category";
import { Divider } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";

function Categories() {
  const { categories, loading } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(null);
  return (
    <>
      <CategoryBreadcrumb
        currentCategoryId={currentCategory}
        setCurrentCategoryId={setCurrentCategory}
      />
      {!loading &&
        categories
          .filter((category) => category.parent_id === currentCategory)
          .map((category) => {
            return (
              <div key={category.id}>
                <Category
                  category={category}
                  setCurrentCategory={setCurrentCategory}
                />
                <Divider />
              </div>
            );
          })}
    </>
  );
}

export default Categories;
