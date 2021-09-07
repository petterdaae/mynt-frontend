import styled from "styled-components";
import RandomIcon from "../random_icon";
import PropTypes from "prop-types";
import { base } from "../size";

const CategoryName = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const StyledCategory = styled(Category)`
  padding: ${4 * base}px;
  border: 1px solid #ccc;
  border-top: none;
  &:hover {
    cursor: pointer;
    background: whitesmoke;
  }
`;

function Category({ category, className, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      <RandomIcon />
      <CategoryName>{category.name}</CategoryName>
    </div>
  );
}
Category.propTypes = {
  category: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default StyledCategory;
