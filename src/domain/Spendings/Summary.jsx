import PropTypes from "prop-types";
import { formatCurrency } from "./../utils";
import { Badge, VStack, HStack, Text } from "@chakra-ui/react";

function Summary({ currentCategory, spendings, loading }) {
  const spending = spendings.find((s) => s.category.id === currentCategory) ?? {
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
    budget: 0,
  };
  return loading ? (
    <></>
  ) : (
    <VStack align="left">
      <HStack justify="space-between">
        <Text fontSize="sm">Spent</Text>
        <Badge colorScheme="red" fontSize="1.0em">
          {formatCurrency(spending.negativeAmount)}
        </Badge>
      </HStack>

      <HStack justify="space-between">
        <Text fontSize="sm">Earned</Text>
        <Badge colorScheme="green" fontSize="1.0em">
          {formatCurrency(spending.positiveAmount)}
        </Badge>
      </HStack>

      <HStack justify="space-between">
        <Text fontSize="sm">Balance (earned - spent)</Text>
        <Badge colorScheme="blue" fontSize="1.0em">
          {formatCurrency(spending.amount)}
        </Badge>
      </HStack>

      <HStack justify="space-between">
        <Text fontSize="sm">Budget</Text>
        <Badge colorScheme="yellow" fontSize="1.0em">
          {formatCurrency(spending.budget)}
        </Badge>
      </HStack>

      <HStack justify="space-between">
        <Text fontSize="sm">Estimated</Text>
        <Badge colorScheme="purple" fontSize="1.0em">
          {formatCurrency(spending.estimated)}
        </Badge>
      </HStack>
    </VStack>
  );
}

Summary.propTypes = {
  currentCategory: PropTypes.number,
  spendings: PropTypes.array,
  loading: PropTypes.bool,
};

export default Summary;
