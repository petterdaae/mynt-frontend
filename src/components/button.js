import styled from "styled-components";
import { base } from "./size";
import { mainFontColor } from "./color";

const StyledButton = styled.button`
  padding-top: ${2 * base}px;
  padding-bottom: ${2 * base}px;
  padding-left: ${5 * base}px;
  padding-right: ${5 * base}px;
  background-color: #fff;
  border: none;
  border: 1px solid lightgray;

  outline: none;

  &:hover {
    cursor: pointer;
    border: 1px solid ${mainFontColor};
  }

  &:active {
    background-color: lightgray;
  }
`;

export default StyledButton;
