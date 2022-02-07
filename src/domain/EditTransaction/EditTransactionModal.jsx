import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
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
  const [newCategorizations, setNewCategorizations] = useState(
    transaction.categorizations
  );

  const [categorizationBeingEdited, setCategorizationBeingEdited] =
    useState(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        {categorizationBeingEdited !== null ? (
          <CategoryPickerModalContent
            setCategorizationBeingEdited={setCategorizationBeingEdited}
            categorizationBeingEdited={categorizationBeingEdited}
            setNewCategorizations={setNewCategorizations}
            newCategorizations={newCategorizations}
            loading={loading}
            categories={categories}
          />
        ) : (
          <EditTransactionModalContent
            transaction={transaction}
            setCategorizationBeingEdited={setCategorizationBeingEdited}
            onClose={onClose}
            updateCategorizationsForTransaction={
              updateCategorizationsForTransaction
            }
            updateTransaction={updateTransaction}
            newCategorizations={newCategorizations}
            setNewCategorizations={setNewCategorizations}
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
