import { HStack, Divider, Button, Text } from "@chakra-ui/react";
import { useCategories } from "../../hooks/domain/useCategories";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { useState } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";

function CategoryPicker({ onSelect }) {
  const { categories, loading } = useCategories();
  const [currentParentCategoryId, setCurrentParentCategoryId] = useState(null);

  return (
    !loading && (
      <div>
        <CategoryBreadcrumb
          categories={categories}
          currentCategoryId={currentParentCategoryId}
          setCurrentCategoryId={setCurrentParentCategoryId}
        />
        <Divider />
        {categories
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
                onClick={() => onSelect(category)}
              >
                <HStack>
                  <CategoryIcon color={category.color} size="sm" />
                  <Text>{category.name}</Text>
                </HStack>
                {categories.find((c) => c.parent_id === category.id) && (
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      setCurrentParentCategoryId(category.id);
                      e.stopPropagation();
                    }}
                    size="sm"
                  >
                    <ArrowRightIcon />
                  </Button>
                )}
              </HStack>
              <Divider />
            </div>
          ))}
      </div>
    )
  );
}

CategoryPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default CategoryPicker;
