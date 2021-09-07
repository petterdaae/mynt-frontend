import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "../size";
import { useCallback, useState, useRef } from "react";
import Button from "../button";
import TextInput from "../text_input";
import BreadCrumb from "./breadcrumb";
import Category from "./category";
import RandomIcon from "../random_icon";

const exampleData = [
  {
    id: 1,
    name: "Category 1",
    paren_id: null,
  },
  {
    id: 7,
    name: "Category 7",
    parent_id: null,
  },
  {
    id: 8,
    name: "Category 8",
    parent_id: 7,
  },
];

const StyledCategories = styled(Categories)`
  border-top: 1px solid #ccc;
`;

const NewCategoryWrapper = styled.div`
  padding: ${4 * base}px;
  border: 1px solid #ccc;
  border-top: none;
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
  const newCategoryNameRef = useRef();

  const navigateBack = useCallback(() => {
    setBreadcrumb((previous) => {
      if (previous.length === 0) return previous;
      return previous.slice(0, previous.length - 1);
    });
  }, [setBreadcrumb]);

  const createCategory = useCallback(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        name: newCategoryNameRef.current.value,
        parent_id: getCurrentCategoryId(breadcrumb),
      }),
    });
  }, [newCategoryNameRef, breadcrumb]);

  return (
    <>
      <Header>
        <Button onClick={navigateBack} disabled={breadcrumb.length === 0}>
          Back
        </Button>
        <BreadCrumb breadcrumb={breadcrumb} categories={exampleData} />
      </Header>
      <StyledCategories
        categories={getCategoriesFromBreadcrumb(exampleData, breadcrumb)}
        depth={0}
        setBreadcrumb={setBreadcrumb}
      />
      <NewCategoryWrapper>
        <RandomIcon></RandomIcon>
        <TextInput placeholder="Name" ref={newCategoryNameRef} />
        <CreateButton onClick={createCategory}>
          Create new category
        </CreateButton>
      </NewCategoryWrapper>
    </>
  );
}

function Categories({ categories, setBreadcrumb, className }) {
  return (
    <div className={className}>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onClick={() => setBreadcrumb((prev) => [...prev, category.id])}
        ></Category>
      ))}
    </div>
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
