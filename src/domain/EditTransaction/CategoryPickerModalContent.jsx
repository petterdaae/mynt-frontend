import {
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import CategoryPicker from "../CategoryPicker/CategoryPicker";

function CategoryPickerModalContent({
  toggleCategoryPicker,
  setNewCategory,
  categories,
  loading,
}) {
  return (
    <>
      <ModalHeader>Choose a category</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CategoryPicker
          onSelect={(newCategory) => {
            toggleCategoryPicker();
            setNewCategory(newCategory);
          }}
          categories={categories}
          loading={loading}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => toggleCategoryPicker()}>Cancel</Button>
      </ModalFooter>
    </>
  );
}

CategoryPickerModalContent.propTypes = {
  toggleCategoryPicker: PropTypes.func.isRequired,
  setNewCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CategoryPickerModalContent;
