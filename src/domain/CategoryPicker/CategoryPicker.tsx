import { HStack, Divider, Button, Text } from "@chakra-ui/react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { useState } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import { Category } from "../../types";

interface Props {
  onSelect: (category: Category | null) => void;
  categories: Category[];
  loading: boolean;
}

function CategoryPicker({ onSelect, categories, loading }: Props) {
  const [currentParentCategoryId, setCurrentParentCategoryId] = useState<
    number | null
  >(null);
  const categoriesWithNullCategory = [null, ...categories];

  return loading ? (
    <></>
  ) : (
    <div>
      <CategoryBreadcrumb
        categories={categories}
        currentCategoryId={currentParentCategoryId}
        setCurrentCategoryId={setCurrentParentCategoryId}
        loading={loading}
        m="2"
      />
      <Divider mt="2" />
      {categoriesWithNullCategory
        .filter(
          (category) => (category?.parentId ?? null) === currentParentCategoryId
        )
        .map((category) =>
          category === null ? (
            <div key={-1}>
              <HStack
                justify="space-between"
                p={1}
                m={1}
                borderRadius="md"
                _hover={{
                  backgroundColor: "whitesmoke",
                  cursor: "pointer",
                }}
                onClick={() => onSelect(null)}
              >
                <HStack>
                  <CategoryIcon color="lightgray" size="sm" />
                  <Text>No category</Text>
                </HStack>
              </HStack>
              <Divider />
            </div>
          ) : (
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
                {categories.find((c) => c.parentId === category.id) && (
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
          )
        )}
    </div>
  );
}

export default CategoryPicker;
