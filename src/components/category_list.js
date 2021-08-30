import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "./size";
import { useCallback, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Button from "./button";

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
              },
            ],
          },
        ],
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

const StyledCategories = styled(Categories)`
  border-top: 1px solid #ccc;
  margin-bottom: ${4 * base}px;
`;

const StyledCategory = styled(Category)`
  padding: ${4 * base}px;
  border: 1px solid #ccc;
  border-top: none;
`;

const CategoryName = styled.div`
  display: inline-block;
`;

const StyledButton = styled(Button)`
  margin-bottom: ${4 * base}px;
`;

const StyledBreadcrumbPart = styled.span`
  padding-left: ${4 * base}px;
  padding-right: ${4 * base}px;

  ${(props) => props.current && "text-decoration: none;"}
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
      <StyledButton onClick={navigateBack}>
        <FaArrowLeft />
      </StyledButton>
      <BreadCrumb breadcrumb={breadcrumb} categories={exampleData} />
      <StyledCategories
        categories={getCategoryFromBreadcrumb(exampleData, breadcrumb, 0)}
        depth={0}
        setBreadcrumb={setBreadcrumb}
      />
    </>
  );
}

function Categories({ categories, setBreadcrumb, className }) {
  return (
    <div className={className}>
      {categories.map((category, index) => (
        <StyledCategory
          key={category.id}
          category={category}
          onClick={() =>
            category.children && setBreadcrumb((prev) => [...prev, index])
          }
        ></StyledCategory>
      ))}
    </div>
  );
}

function Category({ category, className, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      <CategoryName>{category.name}</CategoryName>
    </div>
  );
}

function BreadCrumb({ categories, breadcrumb }) {
  const categoryNames = getCategoryNamesFromBreadCrumb(
    categories,
    breadcrumb,
    0
  );
  return (
    <>
      {categoryNames.map((name, index) => (
        <>
          <StyledBreadcrumbPart
            key={index}
            current={index === categoryNames.length - 1}
          >
            {name}
          </StyledBreadcrumbPart>
          {index !== categoryNames.length - 1 && <span>{">"}</span>}
        </>
      ))}
    </>
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

function getCategoryNamesFromBreadCrumb(categories, breadcrumb, depth) {
  if (breadcrumb.length === depth) return [];
  return [
    categories[breadcrumb[depth]].name,
    ...getCategoryNamesFromBreadCrumb(
      categories[breadcrumb[depth]].children,
      breadcrumb,
      depth + 1
    ),
  ];
}

Categories.propTypes = {
  categories: PropTypes.array,
  setBreadcrumb: PropTypes.func,
  className: PropTypes.string,
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

BreadCrumb.propTypes = {
  categories: PropTypes.array,
  breadcrumb: PropTypes.array,
};

export default CategoriesList;
