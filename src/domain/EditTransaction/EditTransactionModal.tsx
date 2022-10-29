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
  >(transaction.categorizations.map((c) => ({ ...c, newAmount: "" })));

  const [categorizationBeingEdited, setCategorizationBeingEdited] = useState<
    number | null
  >(null);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<EditTransctionSettingsType>({
    customDate: false,
    splitTransaction: false,
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
          />
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default EditTransactionModal;
