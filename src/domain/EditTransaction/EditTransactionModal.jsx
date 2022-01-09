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

function EditTransactionModal({
  transaction,
  isOpen,
  onClose,
  updateCategorizationsForTransaction,
  updateTransaction,
  categories,
  loading,
}) {
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
            categories={categories}
            loading={loading}
          />
        ) : (
          <EditTransactionModalContent
            transaction={transaction}
            toggleCategoryPicker={toggleCategoryPicker}
            onClose={onClose}
            newCategory={newCategory}
            updateCategorizationsForTransaction={
              updateCategorizationsForTransaction
            }
            updateTransaction={updateTransaction}
            categories={categories}
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
  updateCategorizationsForTransaction: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EditTransactionModal;
