import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "./size";
import { mainFontColor } from "./color";
import { useState } from "react";

const Wrapper = styled.div`
  margin-bottom: ${2 * base}px;
  position: relative;
`;

const Selected = styled.div`
  padding: ${2 * base}px ${5 * base}px ${2 * base}px ${5 * base}px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid lightgray;
  font-family: inherit;
  font-size: ${4 * base}px;

  &:hover {
    cursor: pointer;
    border: 1px solid ${mainFontColor};
  }

  &:active {
    background-color: lightgray;
  }

  &:disabled,
  [disabled] {
    background-color: lightgray;
    &:hover {
      cursor: not-allowed;
      border: 1px solid lightgray;
    }
  }
`;

const Options = styled.div`
  position: absolute;
  border: 1px solid lightgray;
  border-top: none;
  width: 100%;
  box-sizing: border-box;
  ${(props) => !props.open && "display: none;"}
`;

const Option = styled.div`
  background-color: #fff;
  padding: ${2 * base}px ${5 * base}px ${2 * base}px ${5 * base}px;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

function Select({ selected, onChange, label, options, ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper {...props}>
      <Selected onClick={() => setOpen((prev) => !prev)}>
        {selected ? selected.label : label}
      </Selected>
      <Options open={open}>
        {options.map((option) => (
          <Option
            key={option.key}
            onClick={() => {
              setOpen(false);
              onChange(option);
            }}
          >
            {option.label}
          </Option>
        ))}
      </Options>
    </Wrapper>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default Select;
