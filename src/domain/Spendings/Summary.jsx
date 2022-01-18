import PropTypes from "prop-types";
import { Center, Badge, HStack, VStack } from "@chakra-ui/react";
import { BarChart, Bar } from "recharts";

const data = [
  {
    name: "Page A",
    actualIncome: 23639,
    budgetIncome: 8600,
    unexpectedIncome: 3000,
    actualExpenses: 17839,
    budgetExpenses: 19573,
    unexpectedExpenses: 2347,
  },
  // {
  //   name: "Page B",
  //   uv: 3000,
  //   pv: 1398,
  //   amt: 2210,
  // },
  // {
  //   name: "Page C",
  //   uv: 2000,
  //   pv: 9800,
  //   amt: 2290,
  // },
];

function Example() {
  return (
    <BarChart
      width={350}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <Bar dataKey="actualIncome" fill="#68D391" stackId="a" />
      <Bar dataKey="unexpectedIncome" fill="#F6AD55" stackId="a" />
      <Bar dataKey="budgetIncome" fill="#63b3ed" />

      <Bar dataKey="spacing" fill="red" />

      <Bar dataKey="actualExpenses" fill="#FC8181" stackId="b" />
      <Bar dataKey="unexpectedExpenses" fill="#F6AD55" stackId="b" />
      <Bar dataKey="budgetExpenses" fill="#63b3ed" />
    </BarChart>
  );
}

function Summary({ currentCategory, spendings }) {
  // const spending = spendings.find((s) => s.category.id === currentCategory) ?? {
  //   amount: 0,
  //   positiveAmount: 0,
  //   negativeAmount: 0,
  // };
  return (
    <Center m="2">
      <VStack>
        <HStack>
          <HStack align="left">
            <VStack align="left">
              <Badge colorScheme="green">Actual</Badge>
              <Badge colorScheme="orange">Unexpected</Badge>
              <Badge colorScheme="blue">Budget</Badge>
            </VStack>
            <VStack align="right">
              <Badge colorScheme="green">17 839,60</Badge>
              <Badge colorScheme="orange">1 534,20</Badge>
              <Badge colorScheme="blue">19 573,00</Badge>
            </VStack>
          </HStack>

          <Example />

          <HStack align="left">
            <VStack align="left">
              <Badge colorScheme="red">Actual</Badge>
              <Badge colorScheme="orange">Unexpected</Badge>
              <Badge colorScheme="blue">Budget</Badge>
            </VStack>
            <VStack align="right">
              <Badge colorScheme="red">-17 839,60</Badge>
              <Badge colorScheme="orange">-1 534,20</Badge>
              <Badge colorScheme="blue">-19 573,00</Badge>
            </VStack>
          </HStack>
        </HStack>
      </VStack>
    </Center>
  );
}

Summary.propTypes = {
  currentCategory: PropTypes.number,
  spendings: PropTypes.array,
};

export default Summary;
