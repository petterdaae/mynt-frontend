import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "../size";
import { useCallback, useState, useEffect } from "react";
import Button from "../button";
import BreadCrumb from "./breadcrumb";
import Category from "./category";
import NewCategory from "./new_category";
import Modal from "../modal";

const StyledCategories = styled(Categories)`
  border-top: 1px solid #ccc;
`;

const CreateButton = styled(Button)`
  margin-left: ${2 * base}px;
  float: right;
`;

const Header = styled.div`
  margin-bottom: ${4 * base}px;
`;

function CategoriesList() {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [setCategories]);

  const navigateBack = useCallback(() => {
    setBreadcrumb((previous) => {
      if (previous.length === 0) return previous;
      return previous.slice(0, previous.length - 1);
    });
  }, [setBreadcrumb]);

  const openCreateCategoryModal = useCallback(
    () => setShowNewCategory(true),
    []
  );

  return (
    <>
      <Header>
        <Button onClick={navigateBack} disabled={breadcrumb.length === 0}>
          Back
        </Button>
        <BreadCrumb breadcrumb={breadcrumb} categories={categories} />
        <CreateButton onClick={openCreateCategoryModal}>
          Create new category
        </CreateButton>
      </Header>
      <StyledCategories
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
        />
      </Modal>
    </>
  );
}

function Categories({ categories, setBreadcrumb, className }) {
  return (
    categories.length > 0 && (
      <div className={className}>
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            onClick={() => setBreadcrumb((prev) => [...prev, category.id])}
          ></Category>
        ))}
      </div>
    )
  );
}

function getCategoriesFromBreadcrumb(categories, breadcrumb) {
  if (breadcrumb.length === 0) {
    return categories.filter((category) => category.parent_id === null);
  }
  return categories.filter(
    (category) => category.parent_id === breadcrumb[breadcrumb.length - 1]
  );
}

function getCurrentCategoryId(breadcrumb) {
  if (breadcrumb.length === 0) {
    return null;
  }
  return breadcrumb[breadcrumb.length - 1];
}

Categories.propTypes = {
  categories: PropTypes.array,
  setBreadcrumb: PropTypes.func,
  className: PropTypes.string,
};

export default CategoriesList;
