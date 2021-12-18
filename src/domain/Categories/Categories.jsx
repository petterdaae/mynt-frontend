import { useCategories } from "../../hooks";
import { useState } from "react";
import Category from "./Category";
import { Divider, HStack, Button } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import NewCategory from "./NewCategory";

function Categories() {
  const { categories, loading } = useCategories();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  return (
    <>
      <HStack justify="space-between" m="2">
        <CategoryBreadcrumb
          currentCategoryId={currentCategory}
          setCurrentCategoryId={setCurrentCategory}
        />
        <Button colorScheme="green" onClick={() => setNewCategoryOpen(true)}>
          Create
        </Button>
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
      <NewCategory
        isOpen={newCategoryOpen}
        onClose={() => setNewCategoryOpen(false)}
        parentCategory={currentCategory}
      />
    </>
  );
}

export default Categories;
