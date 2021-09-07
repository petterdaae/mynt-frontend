import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "../size";

const StyledUl = styled.div`
  border: 1px solid #ccc;
  display: flex;

  box-sizing: border-box;
  margin-left: ${2 * base}px;
  display: inline-flex;
  align-items: center;
  margin: 0;
  margin-left: ${2 * base}px;
`;

const StyledLi = styled.div`
  display: inline-block;
  margin: 0;
  padding: ${2 * base}px;
  border-left: 1px solid #ccc;

  &:first-child {
    border-left: none;
  }

  &:last-child {
    background-color: whitesmoke;
  }

  ${(props) => props.current && ""}
`;

function BreadCrumb({ categories, breadcrumb }) {
  const categoryNames = getCategoryNamesFromBreadCrumb(
    categories,
    breadcrumb,
    0
  );
  return (
    <StyledUl>
      {categoryNames.map((name, index) => (
        <StyledLi key={index} current={index === categoryNames.length - 1}>
          {name}
        </StyledLi>
      ))}
    </StyledUl>
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

BreadCrumb.propTypes = {
  categories: PropTypes.array,
  breadcrumb: PropTypes.array,
};

export default BreadCrumb;
