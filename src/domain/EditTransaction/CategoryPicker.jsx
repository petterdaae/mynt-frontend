import {
  HStack,
  Divider,
  Button,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useCategories } from "../../hooks/domain/useCategories";
import CategoryIcon from "../CategoryIcon";
import { useState } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { getBreadCrumbFromCategoryId } from "./categoryPickerUtils";

function CategoryPicker({ onSelect }) {
  const { categories, loading } = useCategories();
  const [currentParentCategoryId, setCurrentParentCategoryId] = useState(null);
  const breadcrumb = getBreadCrumbFromCategoryId(
    currentParentCategoryId,
    categories
  );
  console.log(breadcrumb);
  return (
    !loading && (
      <div>
        <Breadcrumb m="2">
          <BreadcrumbItem onClick={() => setCurrentParentCategoryId(null)}>
            <BreadcrumbLink>
              <HStack>
                <CategoryIcon color="lightgrey" size="3xs" mr="1" />
                <Text>Top-level categories</Text>
              </HStack>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumb.map((crumb) => (
            <BreadcrumbItem
              key={crumb.id}
              onClick={() => setCurrentParentCategoryId(crumb.id)}
            >
              <BreadcrumbLink href="#">
                <HStack>
                  <CategoryIcon color={crumb.color} size="3xs" mr="1" />
                  <Text>{crumb.name}</Text>
                </HStack>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
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
