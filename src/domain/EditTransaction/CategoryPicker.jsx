import { HStack, Divider, Button, Text } from "@chakra-ui/react";
import { useCategories } from "../../hooks/domain/useCategories";
import CategoryIcon from "../CategoryIcon";
import { useState } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";

function CategoryPicker() {
  const { categories, loading } = useCategories();
  const [currentParentCategoryId, setCurrentParentCategoryId] = useState(null);
  return (
    !loading &&
    categories
      .filter((category) => category.parent_id === currentParentCategoryId)
      .map((category) => (
        <div key={category.id}>
          <HStack
            justify="space-between"
            p={1}
            m={1}
            borderRadius="md"
            _hover={{
              backgroundColor: "whitesmoke",
              cursor: "pointer",
            }}
          >
            <HStack>
              <CategoryIcon color={category.color} size="sm" />
              <Text>{category.name}</Text>
            </HStack>
            {categories.find((c) => c.parent_id === category.id) && (
              <Button
                variant="outline"
                onClick={() => setCurrentParentCategoryId(category.id)}
                size="sm"
              >
                <ArrowRightIcon />
              </Button>
            )}
          </HStack>
          <Divider />
        </div>
      ))
  );
}

export default CategoryPicker;
