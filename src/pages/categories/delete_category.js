import { Button } from "../../components";
import { base } from "../../components/size";
import styled from "styled-components";
import { getCurrentCategoryId } from "../../utils/categories";
import { useCategories } from "../../hooks";
import PropTypes from "prop-types";

const StyledButton = styled(Button)`
  margin-right: ${4 * base}px;
`;

function DeleteCategory({ breadcrumb, setShowDeleteCategory, setBreadcrumb }) {
  const { deleteCategory } = useCategories();
  return (
    <>
      <p>Are you sure you want to delete this category?</p>
      <StyledButton
        onClick={() => {
          const currentCategoryId = getCurrentCategoryId(breadcrumb);
          deleteCategory(currentCategoryId);
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
