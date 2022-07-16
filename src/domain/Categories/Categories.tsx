import { useCategories } from "../../hooks";
import { useMemo, useState } from "react";
import Category from "./Category";
import { Divider, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import NewCategory from "./NewCategory";
import { Category as CategoryType } from "../../types";

function Categories() {
  const { categories, deleteCategory, addCategory, updateCategory, loading } =
    useCategories();
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(
    null
  );
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const currentCategory = useMemo<CategoryType | null>(
    () => categories.find((c) => c.id === currentCategoryId) ?? null,
    [currentCategoryId, categories]
  );
  return (
    <>
      <HStack justify="space-between" m="2">
        <CategoryBreadcrumb
          categories={categories}
          currentCategoryId={currentCategoryId}
          setCurrentCategoryId={setCurrentCategoryId}
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
          .filter((category) => category.parentId === currentCategoryId)
          .map((category) => {
            return (
              <div key={category.id}>
                <Category
                  category={category}
                  setCurrentCategory={setCurrentCategoryId}
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
        parentCategory={currentCategory}
        addCategory={addCategory}
        updateCategory={updateCategory}
        categories={categories}
        loading={loading}
      />
    </>
  );
}

export default Categories;
