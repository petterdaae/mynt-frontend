import { HStack, Text, IconButton } from "@chakra-ui/react";
import { useMemo } from "react";
import { getBreadcrumbFromCategoryId } from "./categoryBreadcrumbUtils";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Category } from "../../types";

interface Props {
  currentCategoryId: number | null;
  setCurrentCategoryId: (id: number | null) => void;
  categories: Category[];
  loading: boolean | null;
  m: string;
}

function CategoryBreadcrumb({
  currentCategoryId,
  setCurrentCategoryId,
  categories,
  loading,
  m,
}: Props) {
  const breadcrumb = useMemo(
    () => getBreadcrumbFromCategoryId(currentCategoryId, categories),
    [currentCategoryId, categories]
  );
  return loading ? (
    <></>
  ) : (
    <HStack m={m}>
      <IconButton
        aria-label="Navigate up in categories"
        onClick={() =>
          setCurrentCategoryId(
            breadcrumb.length > 1 ? breadcrumb[breadcrumb.length - 2].id : null
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
  );
}

export default CategoryBreadcrumb;
