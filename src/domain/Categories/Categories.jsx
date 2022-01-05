import { useCategories } from "../../hooks";
import { useState } from "react";
import Category from "./Category";
import { Divider, HStack, Button } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import NewCategory from "./NewCategory";

function Categories() {
  const { categories, deleteCategory, addCategory, updateCategory, loading } =
    useCategories();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  return (
    <>
      <HStack justify="space-between" m="2">
        <CategoryBreadcrumb
          categories={categories}
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
          .filter((category) => category.parentId === currentCategory)
          .map((category) => {
            return (
              <div key={category.id}>
                <Category
                  category={category}
                  setCurrentCategory={setCurrentCategory}
                  deleteCategory={deleteCategory}
                  addCategory={addCategory}
                  updateCategory={updateCategory}
                />
                <Divider />
              </div>
            );
          })}
      <NewCategory
        isOpen={newCategoryOpen}
        onClose={() => setNewCategoryOpen(false)}
        parentCategory={currentCategory}
        addCategory={addCategory}
        updateCategory={updateCategory}
      />
    </>
  );
}

export default Categories;
