import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "./size";

const StyledCheckbox = styled(Select)`
  padding: ${2 * base}px;
`;

function Select({ value, onChange, label, options, ...props }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} {...props}>
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default StyledCheckbox;
