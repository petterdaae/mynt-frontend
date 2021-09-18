import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "./size";

const StyledCheckbox = styled(Checkbox)`
  display: inline;
`;

const StyledP = styled.p`
  display: inline;
  margin-left: ${base}px;
`;

function Checkbox({ value, onChange, label, ...props }) {
  return (
    <div>
      <input
        type="checkbox"
        value={value.toString()}
        onChange={(e) => onChange(e.target.value === "true")}
        {...props}
      />
      <StyledP>{label}</StyledP>
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default StyledCheckbox;
