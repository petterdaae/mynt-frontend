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
  const { deleteCategory, categories } = useCategories();
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
          console.log("delete clicked");
          const currentCategoryId = category.id;
          deleteCategory(currentCategoryId);
          setBreadcrumb((prev) => {
            const cp = prev.slice();
            cp.splice(-1);
            return cp;
          });
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
