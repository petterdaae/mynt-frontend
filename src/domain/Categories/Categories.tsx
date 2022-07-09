import { useCategories } from "../../hooks";
import { useState } from "react";
import Category from "./Category";
import { Divider, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import NewCategory from "./NewCategory";

function Categories() {
  const { categories, deleteCategory, addCategory, updateCategory, loading } =
    useCategories();
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  return (
    <>
      <HStack justify="space-between" m="2">
        <CategoryBreadcrumb
          categories={categories}
          currentCategoryId={currentCategory}
          setCurrentCategoryId={setCurrentCategory}
          loading={loading}
          m="2"
        />
        <IconButton
          aria-label="New category"
          icon={<AddIcon />}
          colorScheme="green"
          onClick={() => setNewCategoryOpen(true)}
        />
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
                  parentCategory={
                    category.parentId
                      ? categories.find((c) => c.id === category.parentId) ??
                        null
                      : null
                  }
                  categories={categories}
                  loading={loading}
                />
                <Divider />
              </div>
            );
          })}
      <NewCategory
        category={null}
        isOpen={newCategoryOpen}
        onClose={() => setNewCategoryOpen(false)}
        parentCategory={
          categories.find((c) => c.id === currentCategory) ?? null
        }
        addCategory={addCategory}
        updateCategory={updateCategory}
        categories={categories}
        loading={loading}
      />
    </>
  );
}

export default Categories;
