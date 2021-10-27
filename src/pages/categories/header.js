import { base, breakpoint } from "../../components/size";
import styled from "styled-components";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Button } from "../../components";
import PropTypes from "prop-types";
import CategoryIcon from "../../components/category_icon";
import { getCurrentCategoryId } from "../../utils/categories";

const StyledHeader = styled(Header)`
  margin-bottom: ${4 * base}px;
  @media (max-width: ${breakpoint}px) {
    margin-bottom: ${2 * base}px;
  }
`;

const HeaderButton = styled(Button)`
  float: right;
  margin-left: ${2 * base}px;
  @media (max-width: ${breakpoint}px) {
    display: none;
  }
`;

const HeaderButtonMobile = styled(Button)`
  float: right;
  vertical-align: middle;
  margin-left: ${2 * base}px;
  @media (min-width: ${breakpoint}px) {
    display: none;
  }
`;

const CurrentCategoryWrapper = styled.div`
  margin-left: ${2 * base}px;
  display: inline-block;
`;

function Header({
  breadcrumb,
  navigateBack,
  categories,
  setShowNewCategory,
  setShowDeleteCategory,
  setShowEditCategory,
  className,
}) {
  const currentCategoryId = getCurrentCategoryId(breadcrumb);
  const currentCategory = categories.find((c) => c.id === currentCategoryId);
  return (
    <div className={className}>
      <Button onClick={navigateBack} disabled={breadcrumb.length === 0}>
        Back
      </Button>

      <CurrentCategoryWrapper>
        {currentCategory && <CategoryIcon color={currentCategory.color} />}
        {currentCategory && currentCategory.name}
      </CurrentCategoryWrapper>

      <HeaderButton onClick={() => setShowNewCategory(true)}>
        Create new category
      </HeaderButton>
      {breadcrumb.length !== 0 && (
        <>
          <HeaderButton onClick={() => setShowEditCategory(true)}>
            Edit category
          </HeaderButton>
          <HeaderButton onClick={() => setShowDeleteCategory(true)}>
            Delete category
          </HeaderButton>
        </>
      )}

      <HeaderButtonMobile onClick={() => setShowNewCategory(true)}>
        <FiPlus />
      </HeaderButtonMobile>
      {breadcrumb.length !== 0 && (
        <>
          <HeaderButtonMobile onClick={() => setShowEditCategory(true)}>
            Edit category
          </HeaderButtonMobile>
          <HeaderButtonMobile onClick={() => setShowDeleteCategory(true)}>
            <FiTrash />
          </HeaderButtonMobile>
        </>
      )}
    </div>
  );
}

Header.propTypes = {
  breadcrumb: PropTypes.arrayOf(PropTypes.number).isRequired,
  navigateBack: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setShowNewCategory: PropTypes.func.isRequired,
  setShowDeleteCategory: PropTypes.func.isRequired,
  setShowEditCategory: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default StyledHeader;
