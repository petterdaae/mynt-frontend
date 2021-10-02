import { useCallback, useState, useEffect } from "react";
import { Button, Modal } from "../components";
import { NewCategory, CategoryList, Header } from "../components/categories";
import {
  getCategoriesFromBreadcrumb,
  getCurrentCategoryId,
  removeCategory,
} from "../utils/categories";
import { base } from "../components/size";
import styled from "styled-components";

const StyledButton = styled(Button)`
  margin-right: ${4 * base}px;
`;

function Categories() {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);

  const navigateBack = useCallback(() => {
    setBreadcrumb((previous) => {
      if (previous.length === 0) return previous;
      return previous.slice(0, previous.length - 1);
    });
  }, [setBreadcrumb]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [setCategories]);

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
          onCreate={(newCategory) => {
            setCategories((prev) => [...prev, newCategory]);
            setShowNewCategory(false);
          }}
          onCancel={() => setShowNewCategory(false)}
        />
      </Modal>
      <Modal show={showDeleteCategory}>
        <p>Are you sure you want to delete this category?</p>
        <StyledButton
          onClick={() => {
            const currentCategoryId = getCurrentCategoryId(breadcrumb);
            fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
              credentials: "include",
              method: "DELETE",
              body: JSON.stringify({
                id: currentCategoryId,
              }),
            });
            setCategories((prev) => removeCategory(prev, currentCategoryId));
            setBreadcrumb((prev) => prev.splice(-1));
            setShowDeleteCategory(false);
          }}
        >
          Yes
        </StyledButton>
        <Button onClick={() => setShowDeleteCategory(false)}>Cancel</Button>
      </Modal>
    </>
  );
}

export default Categories;
