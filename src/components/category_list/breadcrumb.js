import styled from "styled-components";
import PropTypes from "prop-types";

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  display: inline-block;
`;

const StyledLi = styled.li`
  display: inline-block;
  position: relative;

  &:last-child {
    a {
      cursor: default;
    }

    &:before,
    :after {
      background: lightblue;
    }
  }

  &:not(:last-child):hover {
    &:before,
    :after {
      background: whitesmoke;
      cursor: pointer;
    }
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    height: 50%;
    width: 100%;
    background: white;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    z-index: -2;
  }

  &:before {
    top: -1px;
    transform: skew(30deg);
    border-top: 1px solid #ccc;
  }

  &:after {
    bottom: -1px;
    transform: skew(-30deg);
    border-bottom: 1px solid #ccc;
  }

  &:first-child {
    background: white;
    border-left: 1px solid #ccc;
    box-size: content-box;

    &:hover {
      background: whitesmoke;
      cursor: pointer;
    }
  }

  &:before,
  &:after {
    left: 5px;
  }
`;

const StyledA = styled.a`
  display: inline-block;
  position: relative;
  line-height: 2.5;
  padding: 0 20px;
  text-decoration: none;
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
          <StyledA>{name}</StyledA>
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
