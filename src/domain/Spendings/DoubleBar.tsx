import { Badge, VStack, theme } from "@chakra-ui/react";
import styled from "styled-components";
import { formatCurrency } from "../utils";

interface BarWrapperProps {
  height: number;
  width: number;
}

const BarWrapper = styled.div<BarWrapperProps>`
  position: relative;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

interface ActualProps {
  height: number;
  width: number;
  color: string;
}

const Value1 = styled.div<ActualProps>`
  position: absolute;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  bottom: 0;
  border-radius: 5px;
  z-index: 2;
`;

const Value2 = styled.div<ActualProps>`
  position: absolute;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  bottom: 0;
  border-radius: 5px;
  z-index: 1;
`;

interface Props {
  height: number;
  width: number;
  max: number;
  value1: number;
  value2: number;
  colorScheme1: string;
  colorScheme2: string;
}

function DoubleBar({
  height,
  width,
  max,
  value1,
  value2,
  colorScheme1,
  colorScheme2,
}: Props) {
  const value1Height = Math.round((value1 / max) * height);
  const value2Height = Math.round((value2 / max) * height);
  const bar1Color =
    colorScheme1 === "blue"
      ? theme.colors.blue[300]
      : colorScheme1 === "red"
      ? theme.colors.red[300]
      : theme.colors.gray[300];
  const bar2Color =
    colorScheme2 === "blue"
      ? theme.colors.blue[100]
      : colorScheme2 === "red"
      ? theme.colors.red[100]
      : theme.colors.gray[100];

  return (
    <VStack justifyContent="center">
      {value1 < value2 && (
        <Badge colorScheme={colorScheme1} size="lg" fontSize="1.0em">
          {formatCurrency(value2)}
        </Badge>
      )}
      <BarWrapper height={height} width={width}>
        <Value1 height={value1Height} width={width} color={bar1Color} />
        <Value2 height={value2Height} width={width} color={bar2Color} />
      </BarWrapper>
      <Badge colorScheme={colorScheme1} size="lg" fontSize="1.0em">
        {formatCurrency(value1)}
      </Badge>
    </VStack>
  );
}

export default DoubleBar;
