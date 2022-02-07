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
  setCategorizationBeingEdited,
  categorizationBeingEdited,
  setNewCategorizations,
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
            setCategorizationBeingEdited(null);
            setNewCategorizations((p) =>
              p.map((c) =>
                c.id === categorizationBeingEdited
                  ? { ...c, category: newCategory, categoryId: newCategory.id }
                  : c
              )
            );
          }}
          categories={categories}
          loading={loading}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setCategorizationBeingEdited(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
}

CategoryPickerModalContent.propTypes = {
  setNewCategorizations: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setCategorizationBeingEdited: PropTypes.func.isRequired,
  categorizationBeingEdited: PropTypes.number,
};

export default CategoryPickerModalContent;
