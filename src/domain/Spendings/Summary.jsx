import PropTypes from "prop-types";
import { formatCurrency } from "./../utils";
import { useSpendings } from "../../hooks";
import { Badge, HStack } from "@chakra-ui/react";

function Summary({ currentCategory }) {
  const { spendings, loading } = useSpendings();
  const spending = spendings.find((s) => s.category_id === currentCategory);
  return (
    !loading &&
    spending && (
      <HStack justify="space-between">
        <Badge colorScheme="red" fontSize="1.0em">
          {formatCurrency(spending.negative_amount)}
        </Badge>
        <Badge colorScheme="blue" fontSize="1.0em">
          {formatCurrency(spending.amount)}
        </Badge>
        <Badge colorScheme="green" fontSize="1.0em">
          {formatCurrency(spending.positive_amount)}
        </Badge>
      </HStack>
    )
  );
}

Summary.propTypes = {
  currentCategory: PropTypes.number,
};

export default Summary;
