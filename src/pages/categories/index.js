import { useCallback, useState } from "react";
import { Modal } from "../../components";
import NewCategory from "./new_category";
import DeleteCategory from "./delete_category";
import CategoryList from "./category_list";
import Header from "./header";
import {
  getCategoriesFromBreadcrumb,
  getCurrentCategoryId,
} from "../../utils/categories";
import { CategoriesProvider, useCategories } from "../../hooks";

function Wrapper() {
  return (
    <CategoriesProvider>
      <Categories />
    </CategoriesProvider>
  );
}

function Categories() {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const { categories } = useCategories();

  const navigateBack = useCallback(() => {
    setBreadcrumb((previous) => {
      if (previous.length === 0) return previous;
      return previous.slice(0, previous.length - 1);
    });
  }, [setBreadcrumb]);

  return (
    <>
      <Header
        navigateBack={navigateBack}
        categories={categories}
        breadcrumb={breadcrumb}
        setShowNewCategory={setShowNewCategory}
        setShowDeleteCategory={setShowDeleteCategory}
      />
      <CategoryList
        categories={getCategoriesFromBreadcrumb(categories, breadcrumb)}
        depth={0}
        setBreadcrumb={setBreadcrumb}
      />
      <Modal show={showNewCategory}>
        <NewCategory
          parentCategory={getCurrentCategoryId(breadcrumb)}
          onClose={() => setShowNewCategory(false)}
        />
      </Modal>
      <Modal show={showDeleteCategory}>
        <DeleteCategory
          breadcrumb={breadcrumb}
          setBreadcrumb={setBreadcrumb}
          setShowDeleteCategory={setShowDeleteCategory}
        />
      </Modal>
    </>
  );
}

export default Wrapper;
