import PropTypes from "prop-types";
import { formatCurrency } from "./../utils";
import { Badge, HStack } from "@chakra-ui/react";

function Summary({ currentCategory, spendings, loading }) {
  const spending = spendings.find((s) => s.category.id === currentCategory) ?? {
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
  };
  return loading ? (
    <></>
  ) : (
    <HStack justify="space-between">
      <Badge colorScheme="red" fontSize="1.0em">
        {formatCurrency(spending.negativeAmount)}
      </Badge>
      <Badge colorScheme="blue" fontSize="1.0em">
        {formatCurrency(spending.amount)}
      </Badge>
      <Badge colorScheme="green" fontSize="1.0em">
        {formatCurrency(spending.positiveAmount)}
      </Badge>
    </HStack>
  );
}

Summary.propTypes = {
  currentCategory: PropTypes.number,
  spendings: PropTypes.array,
  loading: PropTypes.bool,
};

export default Summary;
