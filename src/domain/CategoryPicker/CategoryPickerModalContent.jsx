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
  categories,
  loading,
  onSelect,
  onCancel,
}) {
  return (
    <>
      <ModalHeader>Choose a category</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CategoryPicker
          onSelect={onSelect}
          categories={categories}
          loading={loading}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </>
  );
}

CategoryPickerModalContent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CategoryPickerModalContent;
