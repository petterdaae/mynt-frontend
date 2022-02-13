import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useState } from "react";
import CategoryPickerModalContent from "./CategoryPickerModalContent";
import EditTransactionModalContent from "./EditTransactionModalContent";
import {
  RichTransaction,
  Category,
  Transaction,
  NewCategorization,
} from "../../types";

interface Props {
  transaction: RichTransaction;
  isOpen: boolean;
  onClose: () => void;
  updateCategorizationsForTransaction: (
    transactionId: RichTransaction,
    newCategorizations: NewCategorization[]
  ) => void;
  updateTransaction: (transaction: Transaction) => void;
  categories: Category[];
  loading: boolean;
}

function EditTransactionModal({
  transaction,
  isOpen,
  onClose,
  updateCategorizationsForTransaction,
  updateTransaction,
  categories,
  loading,
}: Props) {
  const [newCategorizations, setNewCategorizations] = useState<
    NewCategorization[]
  >(transaction.categorizations.map((c) => ({ ...c, newAmount: "" })));

  const [categorizationBeingEdited, setCategorizationBeingEdited] = useState<
    number | null
  >(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        {categorizationBeingEdited !== null ? (
          <CategoryPickerModalContent
            setCategorizationBeingEdited={setCategorizationBeingEdited}
            categorizationBeingEdited={categorizationBeingEdited}
            setNewCategorizations={setNewCategorizations}
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

export default EditTransactionModal;
