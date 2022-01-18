import PropTypes from "prop-types";
import { formatCurrency } from "./../utils";
import { Badge, VStack, HStack, Text } from "@chakra-ui/react";

function Summary({ currentCategory, spendings }) {
  const spending = spendings.find((s) => s.category.id === currentCategory) ?? {
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
  };
  return (
    <VStack align="left" m="2">
      <HStack justify="space-between">
        <Text fontSize="md">Spent</Text>
        <Badge colorScheme="red" fontSize="1.0em">
          {formatCurrency(spending.negativeAmount)}
        </Badge>
      </HStack>

      <HStack justify="space-between">
        <Text fontSize="md">Earned</Text>
        <Badge colorScheme="green" fontSize="1.0em">
          {formatCurrency(spending.positiveAmount)}
        </Badge>
      </HStack>

      <HStack justify="space-between">
        <Text fontSize="md">Balance (earned - spent)</Text>
        <Badge colorScheme="blue" fontSize="1.0em">
          {formatCurrency(spending.amount)}
        </Badge>
      </HStack>
    </VStack>
  );
}

Summary.propTypes = {
  currentCategory: PropTypes.number,
  spendings: PropTypes.array,
};

export default Summary;
