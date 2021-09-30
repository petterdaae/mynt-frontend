import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "./size";

const StyledIcon = styled.div`
  display: inline-block;
  margin-right: ${3 * base}px;
  vertical-align: middle;
  height: ${5 * base}px;
  width: ${5 * base}px;
  background: ${(props) => props.color};
  border-radius: 50%;
  padding: ${2 * base}px;
`;

StyledIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default StyledIcon;
