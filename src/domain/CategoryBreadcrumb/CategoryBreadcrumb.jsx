import {
  HStack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { getBreadcrumbFromCategoryId } from "./categoryBreadcrumbUtils";
import { useCategories } from "../../hooks";

function CategoryBreadcrumb({ currentCategoryId, setCurrentCategoryId }) {
  const { categories, loading } = useCategories();
  const breadcrumb = useMemo(
    () => getBreadcrumbFromCategoryId(currentCategoryId, categories),
    [currentCategoryId, categories]
  );
  return (
    !loading && (
      <Breadcrumb m="2">
        <BreadcrumbItem onClick={() => setCurrentCategoryId(null)}>
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
            onClick={() => setCurrentCategoryId(crumb.id)}
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
    )
  );
}

CategoryBreadcrumb.propTypes = {
  currentCategoryId: PropTypes.number,
  setCurrentCategoryId: PropTypes.func,
};

export default CategoryBreadcrumb;