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

const Actual = styled.div<ActualProps>`
  position: absolute;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  bottom: 0;
  border-radius: 5px;
`;

interface Props {
  height: number;
  width: number;
  max: number;
  value: number;
  colorScheme: string;
}

function Bar({ height, width, max, value, colorScheme }: Props) {
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

export default Bar;
