function getBreadcrumbFromCategoryId(categoryId, categories) {
  const category = categories.find((c) => c.id === categoryId);
  if (category) {
    return getBreadcrumbFromCategoryId(category.parent_id, categories).concat(
      category
    );
  }
  return [];
}

export { getBreadcrumbFromCategoryId };
