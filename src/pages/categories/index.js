import { useCallback, useState } from "react";
import { Modal, Loader } from "../../components";
import NewCategory from "./new_category";
import DeleteCategory from "./delete_category";
import CategoryList from "./category_list";
import Header from "./header";
import Summary from "./summary";
import {
  getCategoriesFromBreadcrumb,
  getCurrentCategoryId,
} from "../../utils/categories";
import {
  CategoriesProvider,
  SpendingsProvider,
  useCategories,
} from "../../hooks";
import styled from "styled-components";

const StyledLoader = styled(Loader)`
  margin: auto;
  margin-top: 200px;
`;

function Wrapper() {
  return (
    <CategoriesProvider>
      <SpendingsProvider>
        <Categories />
      </SpendingsProvider>
    </CategoriesProvider>
  );
}

function Categories() {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const { categories, loading } = useCategories();

  const navigateBack = useCallback(() => {
    setBreadcrumb((previous) => {
      if (previous.length === 0) return previous;
      return previous.slice(0, previous.length - 1);
    });
  }, [setBreadcrumb]);

  return loading ? (
    <StyledLoader />
  ) : (
    <>
      <Header
        navigateBack={navigateBack}
        categories={categories}
        breadcrumb={breadcrumb}
        setShowNewCategory={setShowNewCategory}
        setShowDeleteCategory={setShowDeleteCategory}
        setShowEditCategory={setShowEditCategory}
      />
      <Summary currentCategory={getCurrentCategoryId(breadcrumb)} />
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
      <Modal show={showEditCategory}>
        <NewCategory
          parentCategory={getCurrentCategoryId(breadcrumb)}
          onClose={() => setShowEditCategory(false)}
          edit
        />
      </Modal>
    </>
  );
}

export default Wrapper;
