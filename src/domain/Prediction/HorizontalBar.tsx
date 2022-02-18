import styled from "styled-components";
import { Badge, HStack, theme } from "@chakra-ui/react";
import { formatCurrency } from "../utils";

interface Width {
  width: number;
}

interface BarProps {
  width: number;
  color: string;
}

const Wrapper = styled.div<Width>`
  display: flex;
  width: ${(props) => props.width}px;
`;

const Left = styled.div<Width>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  align-items: flex-end;
  justify-content: center;
  padding-right: 5px;
`;

const Right = styled.div<Width>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width}px;
  justify-content: center;
  padding-left: 5px;
`;

const LeftBar = styled.div<BarProps>`
  height: 30px;
  width: ${(props) => props.width}px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const RightBar = styled.div<BarProps>`
  height: 30px;
  width: ${(props) => props.width}px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

interface Props {
  width: number;
  value: number;
  max: number;
  colorScheme: string;
}

function HorizonalBar({ width, value, max, colorScheme }: Props) {
  const barWidth = Math.abs(Math.round((value / max) * (width / 2)));
  const barColor =
    colorScheme === "blue"
      ? theme.colors.blue[300]
      : colorScheme === "red"
      ? theme.colors.red[300]
      : theme.colors.gray[300];
  return (
    <Wrapper width={width}>
      <Left width={width / 2}>
        {value < 0 && <LeftBar width={barWidth} color={barColor} />}
        {value >= 0 && (
          <HStack align="left" justify="flex-start">
            <Badge colorScheme={colorScheme} size="lg" fontSize="1.0em">
              {formatCurrency(value)}
            </Badge>
          </HStack>
        )}
      </Left>
      <Right width={width / 2}>
        {value >= 0 && <RightBar width={barWidth} color={barColor} />}
        {value < 0 && (
          <HStack align="left" justify="flex-start">
            <Badge colorScheme={colorScheme} size="lg" fontSize="1.0em">
              {formatCurrency(value)}
            </Badge>
          </HStack>
        )}
      </Right>
    </Wrapper>
  );
}

export default HorizonalBar;
