import { HStack, Text, Badge } from "@chakra-ui/react";
import { Category, Spending as SpendingType } from "../../types";
import CategoryIcon from "../Icons/CategoryIcon";
import { formatCurrency } from "../utils";

interface Props {
  spending: SpendingType;
  category: Category;
  setCurrentCategory: (id: number) => void;
}

function Spending({ spending, category, setCurrentCategory }: Props) {
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
        <CategoryIcon color={category.color} size="md" />
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

export default Spending;
