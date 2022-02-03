import { Badge, VStack, theme } from "@chakra-ui/react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { formatCurrency } from "../utils";

const BarWrapper = styled.div`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

const Actual = styled.div`
  position: absolute;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  z-index: 2;
  bottom: 0;
  border-radius: 5px;
`;

const Budget = styled.div`
  position: absolute;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${theme.colors.orange[200]};
  z-index: ${(props) => props.zIndex};
  bottom: 0;
  border-radius: 5px;
`;

function Bar({ height, width, actual, budget, isIncome, max }) {
  const actualHeight = Math.round((actual / max) * height);
  const budgetHeight = Math.round((budget / max) * height);
  const actualColor = isIncome
    ? theme.colors.green[300]
    : theme.colors.red[300];
  const colorScheme = isIncome ? "green" : "red";
  return (
    <VStack justifyContent="center">
      <BarWrapper height={height} width={width}>
        <Actual
          height={actualHeight}
          width={width}
          color={actualColor}
          zIndex={actual > budget ? 1 : 2}
        />
        <Budget
          height={budgetHeight}
          width={width}
          zIndex={actual > budget ? 2 : 1}
        />
      </BarWrapper>
      <Badge colorScheme={colorScheme} size="lg" fontSize="1.0em">
        {formatCurrency(actual)}
      </Badge>
    </VStack>
  );
}

Bar.propTypes = {
  height: PropTypes.number,
  max: PropTypes.number,
  width: PropTypes.number,
  actual: PropTypes.number,
  budget: PropTypes.number,
  isIncome: PropTypes.bool,
};

export default Bar;
