import PropTypes from "prop-types";
import styled from "styled-components";
import { base } from "./size";

const StyledListItem = styled(ListItem)`
  padding: ${4 * base}px;
  border: 1px solid #ccc;
  border-top: none;

  &:hover {
    cursor: pointer;
    background: whitesmoke;
  }
`;

function ListItem({ onClick, className, children }) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}

ListItem.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default StyledListItem;
