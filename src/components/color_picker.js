import styled from "styled-components";
import PropTypes from "prop-types";

const base = 4;
const red = "red";

const Colors = styled.div`
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

const ErrorMessage = styled.div`
  line-height: 15px;
  margin: 0;
  color: ${red};
  font-size: 14px;
  height: 15px;
`;

const colors = ["#7f87b2", "#83b2d0", "#95dab6", "#f2e6b1", "#dc8580"];

function ColorPicker({ value, onChange, error }) {
  return (
    <>
      <Colors>
        {colors.map((color) => (
          <Color
            color={color}
            key={color}
            onClick={() => onChange(color)}
            selected={color === value}
          />
        ))}
      </Colors>
      <ErrorMessage>{error}</ErrorMessage>
    </>
  );
}

ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default ColorPicker;
