import { HStack, Text, IconButton } from "@chakra-ui/react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { getBreadcrumbFromCategoryId } from "./categoryBreadcrumbUtils";
import { ArrowUpIcon } from "@chakra-ui/icons";

function CategoryBreadcrumb({
  currentCategoryId,
  setCurrentCategoryId,
  categories,
  loading,
  ...props
}) {
  const breadcrumb = useMemo(
    () => getBreadcrumbFromCategoryId(currentCategoryId, categories),
    [currentCategoryId, categories]
  );
  return (
    !loading && (
      <HStack {...props}>
        <IconButton
          onClick={() =>
            setCurrentCategoryId(
              breadcrumb.length > 1
                ? breadcrumb[breadcrumb.length - 2].id
                : null
            )
          }
          disabled={loading || currentCategoryId === null}
          icon={<ArrowUpIcon />}
        />
        {breadcrumb.map((crumb, index) => (
          <HStack key={crumb.id}>
            <Text
              verticalAlign="center"
              borderBottom={`2px solid ${crumb.color}`}
            >
              {crumb.name}
            </Text>
            {index === breadcrumb.length - 1 ? null : <Text>-</Text>}
          </HStack>
        ))}
      </HStack>
    )
  );
}

CategoryBreadcrumb.propTypes = {
  currentCategoryId: PropTypes.number,
  setCurrentCategoryId: PropTypes.func,
  categories: PropTypes.array,
  loading: PropTypes.bool,
};

export default CategoryBreadcrumb;
