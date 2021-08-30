import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "../components/size";
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "Category 1",
    children: [
      {
        id: 2,
        name: "Category 2",
      },
      {
        id: 3,
        name: "Category 3",
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
      },
      {
        id: 6,
        name: "Category 6",
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
      },
      {
        id: 9,
        name: "Category 9",
      },
    ],
  },
];

const CategoriesWrapper = styled.div`
  border-top: 1px solid #ccc;
  margin-bottom: ${4 * base}px;
`;

const CategoryWrapper = styled.div`
  padding: ${4 * base}px;
  border: 1px solid #ccc;
  border-top: none;
`;

function DummyWrapper() {
  const [breadcrumb, setBreadcrumb] = useState([]);
  return (
    <>
      <button
        onClick={() =>
          setBreadcrumb((prev) => {
            if (prev === []) return [];
            prev.pop();
            return [...prev];
          })
        }
      >
        Back
      </button>
      {breadcrumbText(data, breadcrumb, 0)}
      <Categories
        categories={getCategories(data, breadcrumb, 0)}
        depth={0}
        setBreadcrumb={setBreadcrumb}
      />
    </>
  );
}

function breadcrumbText(categories, breadcrumb, index) {
  if (breadcrumb.length === index) return "";
  return (
    breadcrumbText(
      categories[breadcrumb[index]].children,
      breadcrumb,
      index + 1
    ) +
    " > " +
    categories[breadcrumb[index]].name
  );
}

function getCategories(categories, breadcrumb, depth) {
  if (breadcrumb.length === depth) return categories;
  return getCategories(
    categories[breadcrumb[depth]].children,
    breadcrumb,
    depth + 1
  );
}

function Categories({ categories, depth, setBreadcrumb }) {
  return (
    <>
      <CategoriesWrapper depth={depth}>
        {categories.map((category, index) => (
          <Category
            key={category.id}
            category={category}
            onClick={() =>
              category.children && setBreadcrumb((prev) => [...prev, index])
            }
          ></Category>
        ))}
      </CategoriesWrapper>
    </>
  );
}

Categories.propTypes = {
  categories: PropTypes.array,
  depth: PropTypes.number,
  setBreadcrumb: PropTypes.func,
};

const CategoryName = styled.div`
  display: inline-block;
`;

function Category({ category, onClick }) {
  return (
    <>
      <CategoryWrapper onClick={onClick}>
        <CategoryName>{category.name}</CategoryName>
      </CategoryWrapper>
    </>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default DummyWrapper;
