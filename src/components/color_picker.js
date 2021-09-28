import styled from "styled-components";
import { base } from "./size";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
`;

const Color = styled.div`
  width: ${8 * base}px;
  height: ${8 * base}px;
  border-radius: 50%;
  border: ${base}px solid ${(props) => props.color};
  box-sizing: border-box;

  &:not(:last-child) {
    margin-right: ${base}px;
  }

  &:hover {
    cursor: pointer;
  }

  ${(props) => props.selected && `background: ${props.color};`}
`;

const colors = ["#7f87b2", "#83b2d0", "#95dab6", "#f2e6b1", "#dc8580"];

function ColorPicker({ value, onChange }) {
  return (
    <Wrapper>
      {colors.map((color) => (
        <Color
          color={color}
          key={color}
          onClick={() => onChange(color)}
          selected={color === value}
        />
      ))}
    </Wrapper>
  );
}

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
