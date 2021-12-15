import {
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import CategoryPicker from "../CategoryPicker/CategoryPicker";

function CategoryPickerModalContent({ toggleCategoryPicker, setNewCategory }) {
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
};

export default CategoryPickerModalContent;
