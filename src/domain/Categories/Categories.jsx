import { useCategories } from "../../hooks";
import { useState } from "react";
import Category from "./Category";
import { Divider, HStack, Button } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";

function Categories() {
  const { categories, loading } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(null);
  return (
    <>
      <HStack justify="space-between" m="2">
        <CategoryBreadcrumb
          currentCategoryId={currentCategory}
          setCurrentCategoryId={setCurrentCategory}
        />
        <Button colorScheme="green">Create</Button>
      </HStack>
      <Divider />
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
