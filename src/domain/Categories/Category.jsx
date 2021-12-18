import { HStack, Text } from "@chakra-ui/react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import PropTypes from "prop-types";

function Category({ category, setCurrentCategory }) {
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
    </HStack>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  setCurrentCategory: PropTypes.func.isRequired,
};

export default Category;
