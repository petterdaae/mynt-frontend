import styled from "styled-components";
import PropTypes from "prop-types";
import { green, red } from "./color";
import { formatCurrency } from "../utils/currency";

const StyledP = styled.p`
  color: ${(props) => props.color};
`;

function Currency({ value, ...props }) {
  return (
    <StyledP color={value >= 0 ? green : red} {...props}>
      {formatCurrency(value)}
    </StyledP>
  );
}

Currency.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Currency;
