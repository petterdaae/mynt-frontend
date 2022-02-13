import { Category } from "../../types";

function getBreadcrumbFromCategoryId(
  categoryId: number | null,
  categories: Category[]
): Category[] {
  const category = categories.find((c) => c.id === categoryId);
  if (category) {
    return getBreadcrumbFromCategoryId(category.parentId, categories).concat(
      category
    );
  }
  return [];
}

export { getBreadcrumbFromCategoryId };
