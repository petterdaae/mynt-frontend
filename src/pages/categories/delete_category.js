import { Button } from "../../components";
import { base } from "../../components/size";
import styled from "styled-components";
import { getCurrentCategoryId } from "../../utils/categories";
import { useCategories, useSpendings } from "../../hooks";
import PropTypes from "prop-types";

const StyledButton = styled(Button)`
  margin-right: ${4 * base}px;
`;

function DeleteCategory({ breadcrumb, setShowDeleteCategory, setBreadcrumb }) {
  const { deleteCategory, categories } = useCategories();
  const { refresh } = useSpendings();
  const category = categories.find(
    (c) => c.id === getCurrentCategoryId(breadcrumb)
  );
  return (
    <>
      <p>
        Are you sure you want to delete this category? (<b>{category.name}</b>)
      </p>
      <StyledButton
        onClick={() => {
          const currentCategoryId = category.id;
          deleteCategory(currentCategoryId).then(() => refresh());
          setBreadcrumb((prev) => prev.splice(-1));
          setShowDeleteCategory(false);
        }}
      >
        Yes
      </StyledButton>
      <Button onClick={() => setShowDeleteCategory(false)}>Cancel</Button>
    </>
  );
}

DeleteCategory.propTypes = {
  breadcrumb: PropTypes.array.isRequired,
  setShowDeleteCategory: PropTypes.func.isRequired,
  setBreadcrumb: PropTypes.func.isRequired,
};

export default DeleteCategory;
