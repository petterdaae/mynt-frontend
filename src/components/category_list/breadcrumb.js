import styled from "styled-components";
import PropTypes from "prop-types";
import { base, breakpoint } from "../size";

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

  @media (max-width: ${breakpoint}px) {
    display: none;

    &:last-child {
      display: inline-block;
    }
  }
`;

const MobileDots = styled.div`
  @media (min-width: ${breakpoint}px) {
    display: none;
  }
  display: inline-block;
  margin: 0;
  padding: ${2 * base}px;
`;

function BreadCrumb({ categories, breadcrumb }) {
  const categoryNames = getCategoryNamesFromBreadCrumb(categories, breadcrumb);
  return (
    <StyledUl>
      {categoryNames.length > 1 && <MobileDots>...</MobileDots>}
      <div>
        {categoryNames.map((name, index) => (
          <StyledLi key={index} current={index === categoryNames.length - 1}>
            {name}
          </StyledLi>
        ))}
      </div>
    </StyledUl>
  );
}

function getCategoryNamesFromBreadCrumb(categories, breadcrumb) {
  return breadcrumb.map(
    (id) => categories.find((category) => category.id === id).name
  );
}

BreadCrumb.propTypes = {
  categories: PropTypes.array,
  breadcrumb: PropTypes.array,
};

export default BreadCrumb;
