import styled from "styled-components";
import PropTypes from "prop-types";
import { base, breakpoint } from "../size";
import { useCallback, useState, useEffect } from "react";
import Button from "../button";
import BreadCrumb from "./breadcrumb";
import Category from "./category";
import NewCategory from "./new_category";
import Modal from "../modal";
import { FiPlus, FiTrash } from "react-icons/fi";

const StyledCategories = styled(Categories)`
  border-top: 1px solid #ccc;
`;

const HeaderButton = styled(Button)`
  float: right;
  margin-left: ${2 * base}px;
  @media (max-width: ${breakpoint}px) {
    display: none;
  }
`;

const HeaderButtonMobile = styled(Button)`
  float: right;
  vertical-align: middle;
  margin-left: ${2 * base}px;
  @media (min-width: ${breakpoint}px) {
    display: none;
  }
`;

const Header = styled.div`
  margin-bottom: ${4 * base}px;
  @media (max-width: ${breakpoint}px) {
    margin-bottom: ${2 * base}px;
  }
`;

function CategoriesList() {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);

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

  return (
    <>
      <Header>
        <Button onClick={navigateBack} disabled={breadcrumb.length === 0}>
          Back
        </Button>
        <BreadCrumb breadcrumb={breadcrumb} categories={categories} />

        <HeaderButton onClick={() => setShowNewCategory(true)}>
          Create new category
        </HeaderButton>
        {breadcrumb.length !== 0 && (
          <HeaderButton onClick={() => setShowDeleteCategory(true)}>
            Delete category
          </HeaderButton>
        )}

        <HeaderButtonMobile onClick={() => setShowNewCategory(true)}>
          <FiPlus />
        </HeaderButtonMobile>
        {breadcrumb.length !== 0 && (
          <HeaderButtonMobile onClick={() => setShowDeleteCategory(true)}>
            <FiTrash />
          </HeaderButtonMobile>
        )}
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
          onCancel={() => setShowNewCategory(false)}
        />
      </Modal>
      <Modal show={showDeleteCategory}>
        <p>Are you sure you want to delete this category?</p>
        <Button
          onClick={() => {
            const currentCategoryId = getCurrentCategoryId(breadcrumb);
            fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
              credentials: "include",
              method: "DELETE",
              body: JSON.stringify({
                id: currentCategoryId,
              }),
            }).then((res) => res.json());
            setCategories((prev) => removeCategory(prev, currentCategoryId));
            setBreadcrumb((prev) => prev.splice(-1));
            setShowDeleteCategory(false);
          }}
        >
          Yes
        </Button>
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

function removeCategory(categories, id) {
  const children = categories.filter((category) => category.parent_id === id);
  for (const child of children) {
    categories = removeCategory(categories, child.id);
  }
  categories = categories.filter((category) => category.id !== id);
  return categories;
}

Categories.propTypes = {
  categories: PropTypes.array,
  setBreadcrumb: PropTypes.func,
  className: PropTypes.string,
};

export default CategoriesList;
