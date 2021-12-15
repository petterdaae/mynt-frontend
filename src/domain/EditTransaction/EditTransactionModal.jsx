import {
  Modal,
  ModalOverlay,
  useBoolean,
  ModalContent,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import CategoryPickerModalContent from "./CategoryPickerModalContent";
import EditTransactionModalContent from "./EditTransactionModalContent";

function EditTransactionModal({ transaction, isOpen, onClose }) {
  const [showCategoryPicker, { toggle: toggleCategoryPicker }] =
    useBoolean(false);
  const [newCategory, setNewCategory] = useState(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        {showCategoryPicker ? (
          <CategoryPickerModalContent
            toggleCategoryPicker={toggleCategoryPicker}
            setNewCategory={setNewCategory}
          />
        ) : (
          <EditTransactionModalContent
            transaction={transaction}
            toggleCategoryPicker={toggleCategoryPicker}
            onClose={onClose}
            newCategory={newCategory}
          />
        )}
      </ModalContent>
    </Modal>
  );
}

EditTransactionModal.propTypes = {
  transaction: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditTransactionModal;
