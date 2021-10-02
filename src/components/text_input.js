import styled from "styled-components";
import { mainFontColor, red } from "./color";
import { base } from "./size";
import PropTypes from "prop-types";

const StyledInput = styled.input`
  padding: ${2 * base}px;
  background-color: ${(props) => (props.error ? "#fce4e4" : "#fff")};
  border: none;
  border: 1px solid ${(props) => (props.error ? red : "lightgray")};

  outline: none;

  &:focus {
    border: 1px solid ${mainFontColor};
  }
`;

const ErrorMessage = styled.div`
  line-height: 15px;
  margin: 0;
  color: ${red};
  font-size: 14px;
  height: 15px;
`;

const Wrapper = styled.div`
  display: inline-block;
`;

function TextInput({ error, className, ...props }) {
  console.log(error);
  return (
    <Wrapper className={className}>
      <StyledInput error={error} {...props} />
      <ErrorMessage>{error}</ErrorMessage>
    </Wrapper>
  );
}

TextInput.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
};

export default TextInput;
