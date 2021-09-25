function getCategoriesFromBreadcrumb(categories, breadcrumb) {
  if (breadcrumb.length === 0) {
    return categories.filter((category) => category.parent_id === null);
  }
  return categories.filter(
    (category) => category.parent_id === breadcrumb[breadcrumb.length - 1]
  );
}

function getCurrentCategoryId(breadcrumb) {
  if (breadcrumb.length === 0) {
    return null;
  }
  return breadcrumb[breadcrumb.length - 1];
}

function removeCategory(categories, id) {
  const children = categories.filter((category) => category.parent_id === id);
  for (const child of children) {
    categories = removeCategory(categories, child.id);
  }
  categories = categories.filter((category) => category.id !== id);
  return categories;
}

export { getCurrentCategoryId, getCategoriesFromBreadcrumb, removeCategory };
