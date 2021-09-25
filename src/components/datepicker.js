import styled from "styled-components";
import { base } from "./size";
import { mainFontColor } from "./color";
import PropTypes from "prop-types";

const StyledDatePicker = styled(DatePicker)`
  padding: ${2 * base}px;
  background-color: #fff;
  border: none;
  border: 1px solid lightgray;

  outline: none;

  &:focus {
    border: 1px solid ${mainFontColor};
  }
  padding-left: ${5 * base}px;
  padding-right: ${5 * base}px;
  padding-top: ${2 * base}px;
  padding-bottom: ${2 * base}px;
  background-color: #fff;
  border: 1px solid lightgray;
  box-sizing: border-box;
  font-family: inherit;
  font-size: ${4 * base}px;

  &:hover {
    cursor: pointer;
    border: 1px solid ${mainFontColor};
  }
`;

function DatePicker({ value, onChange, min, max, className }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      max={max}
      className={className}
      type="date"
      required
      onKeyDown={(e) => e.preventDefault()}
    />
  );
}

DatePicker.propTypes = {
  value: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default StyledDatePicker;
