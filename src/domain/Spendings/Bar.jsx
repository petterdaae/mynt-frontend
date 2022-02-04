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
function Bar({ height, width, max, value, colorScheme }) {
  const actualHeight = Math.round((value / max) * height);
  const barColor =
    colorScheme === "blue"
      ? theme.colors.blue[300]
      : colorScheme === "red"
      ? theme.colors.red[300]
      : theme.colors.gray[300];
  return (
    <VStack justifyContent="center">
      <BarWrapper height={height} width={width}>
        <Actual height={actualHeight} width={width} color={barColor} />
      </BarWrapper>
      <Badge colorScheme={colorScheme} size="lg" fontSize="1.0em">
        {formatCurrency(value)}
      </Badge>
    </VStack>
  );
}

Bar.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  colorScheme: PropTypes.string,
};

export default Bar;
