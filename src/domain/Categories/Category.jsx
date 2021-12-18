import { HStack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import PropTypes from "prop-types";
import NewCategory from "./NewCategory";

function Category({ category, setCurrentCategory }) {
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  return (
    <>
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
        <HStack>
          <Button
            onClick={(e) => {
              setEditCategoryOpen(true);
              e.stopPropagation();
            }}
          >
            Edit
          </Button>
          <Button colorScheme="red">Delete</Button>
        </HStack>
      </HStack>
      <NewCategory
        isOpen={editCategoryOpen}
        onClose={() => setEditCategoryOpen(false)}
        edit
      />
    </>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  setCurrentCategory: PropTypes.func.isRequired,
};

export default Category;
