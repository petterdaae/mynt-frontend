import styled from "styled-components";
import { mainFontColor } from "./color";
import { base } from "./size";

const StyledInput = styled.input`
  padding: ${2 * base}px;
  background-color: #fff;
  border: none;
  border: 1px solid lightgray;

  outline: none;

  &:focus {
    border: 1px solid ${mainFontColor};
  }
`;

export default StyledInput;
