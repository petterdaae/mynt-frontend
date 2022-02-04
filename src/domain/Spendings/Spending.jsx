import { HStack, Text, Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { formatCurrency } from "../utils";

function Spending({ spending, category, setCurrentCategory }) {
  return (
    <HStack
      justify="space-between"
      m="4px"
      p="4px"
      borderRadius="md"
      _hover={{ background: "whitesmoke", cursor: "pointer" }}
      onClick={() => setCurrentCategory(category.id)}
    >
      <HStack>
        <CategoryIcon color={category.color} />
        <Text>{category.name}</Text>
      </HStack>
      <Badge
        colorScheme={spending.amount >= 0 ? "blue" : "red"}
        fontSize="1.0em"
      >
        {formatCurrency(spending.amount)}
      </Badge>
    </HStack>
  );
}

Spending.propTypes = {
  spending: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  setCurrentCategory: PropTypes.func.isRequired,
};

export default Spending;
