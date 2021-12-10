function getBreadCrumbFromCategoryId(categoryId, categories) {
  const category = categories.find((c) => c.id === categoryId);
  if (category) {
    return getBreadCrumbFromCategoryId(category.parent_id, categories).concat(
      category
    );
  }
  return [];
}

export { getBreadCrumbFromCategoryId };
