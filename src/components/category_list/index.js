import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "../size";
import { useCallback, useState } from "react";
import Button from "../button";
import TextInput from "../text_input";
import BreadCrumb from "./breadcrumb";
import Category from "./category";
import RandomIcon from "../random_icon";

const exampleData = [
  {
    id: 1,
    name: "Category 1",
    children: [
      {
        id: 2,
        name: "Category 2",
        children: [
          {
            id: 3,
            name: "Category 3",
            children: [
              {
                id: 4,
                name: "Category 4",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Category 3",
        children: [],
      },
    ],
  },
  {
    id: 4,
    name: "Category 4",
    children: [
      {
        id: 5,
        name: "Category 5",
        children: [],
      },
      {
        id: 6,
        name: "Category 6",
        children: [],
      },
    ],
  },
  {
    id: 7,
    name: "Category 7",
    children: [
      {
        id: 8,
        name: "Category 8",
        children: [],
      },
      {
        id: 9,
        name: "Category 9",
        children: [],
      },
    ],
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

  const navigateBack = useCallback(() => {
    setBreadcrumb((previous) => {
      if (previous.length === 0) return previous;
      return previous.slice(0, previous.length - 1);
    });
  }, [setBreadcrumb]);

  return (
    <>
      <Header>
        <Button onClick={navigateBack}>Back</Button>
        <BreadCrumb breadcrumb={breadcrumb} categories={exampleData} />
      </Header>
      <StyledCategories
        categories={getCategoryFromBreadcrumb(exampleData, breadcrumb, 0)}
        depth={0}
        setBreadcrumb={setBreadcrumb}
      />
      <NewCategoryWrapper>
        <RandomIcon></RandomIcon>
        <TextInput placeholder="Name" />
        <CreateButton>Create new category</CreateButton>
      </NewCategoryWrapper>
    </>
  );
}

function Categories({ categories, setBreadcrumb, className }) {
  return (
    <div className={className}>
      {categories.map((category, index) => (
        <Category
          key={category.id}
          category={category}
          onClick={() =>
            category.children && setBreadcrumb((prev) => [...prev, index])
          }
        ></Category>
      ))}
    </div>
  );
}

function getCategoryFromBreadcrumb(categories, breadcrumb, depth) {
  if (breadcrumb.length === depth) return categories;
  return getCategoryFromBreadcrumb(
    categories[breadcrumb[depth]].children,
    breadcrumb,
    depth + 1
  );
}

Categories.propTypes = {
  categories: PropTypes.array,
  setBreadcrumb: PropTypes.func,
  className: PropTypes.string,
};

export default CategoriesList;
