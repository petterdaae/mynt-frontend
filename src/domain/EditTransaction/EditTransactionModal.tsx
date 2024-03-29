import { ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import CategoryPickerModalContent from "./CategoryPickerModalContent";
import EditTransactionModalContent from "./EditTransactionModalContent";
import {
  RichTransaction,
  Transaction,
  EditableCategorization,
  Categorization,
  Category,
} from "../../types";
import ResponsiveModal from "../../components/ResponsiveModal";
import ResponsiveModalContent from "../../components/ResponsiveModalContent";
import EditTransactionSettings from "./EditTransactionSettings";
import EditTransctionSettingsType from "../../types/EditTransctionSettings";

interface Props {
  transaction: RichTransaction;
  isOpen: boolean;
  onClose: () => void;
  updateCategorizationsForTransaction: (
    transaction: Transaction,
    categorizations: Categorization[]
  ) => void;
  updateTransaction: (transaction: Transaction) => void;
  categories: Category[];
  loading: boolean;
}

function initialCategorizations(
  transaction: RichTransaction
): EditableCategorization[] {
  if (transaction.categorizations.length === 0) {
    return [
      {
        id: 1,
        transactionId: transaction.id,
        amount: transaction.amount,
        category: null,
      },
    ];
  }
  return transaction.categorizations;
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
  const [categorizations, setCategorizations] = useState<
    EditableCategorization[]
  >(initialCategorizations(transaction));

  const [categorizationBeingEdited, setCategorizationBeingEdited] = useState<
    number | null
  >(null);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<EditTransctionSettingsType>({
    customDate: !!transaction.customDate,
    splitTransaction: transaction.categorizations.length > 1,
  });

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="white" />
      <ResponsiveModalContent>
        {settingsOpen ? (
          <EditTransactionSettings
            settings={settings}
            setSettings={setSettings}
            setSettingsOpen={setSettingsOpen}
          />
        ) : categorizationBeingEdited !== null ? (
          <CategoryPickerModalContent
            setCategorizationBeingEdited={setCategorizationBeingEdited}
            categorizationBeingEdited={categorizationBeingEdited}
            setCategorizations={setCategorizations}
            loading={loading}
            categories={categories}
          />
        ) : (
          <EditTransactionModalContent
            transaction={transaction}
            onClose={onClose}
            updateCategorizationsForTransaction={
              updateCategorizationsForTransaction
            }
            updateTransaction={updateTransaction}
            categorizations={categorizations}
            setCategorizations={setCategorizations}
            setCategorizationBeingEdited={setCategorizationBeingEdited}
            setSettingsOpen={setSettingsOpen}
            settings={settings}
          />
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default EditTransactionModal;
