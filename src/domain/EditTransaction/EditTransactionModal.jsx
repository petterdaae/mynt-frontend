import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Text,
  Divider,
  useBoolean,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import CategoryIcon from "../CategoryIcon";
import CategoryPicker from "./CategoryPicker";
import { formatReadableDate } from "../transactionListUtils";
import { useState } from "react";
import { useTransactions } from "../../hooks/domain/useTransactions";

function EditTransactionModal({ transaction, isOpen, onClose }) {
  const [showCategoryPicker, { toggle: toggleCategoryPicker }] =
    useBoolean(false);
  const [newCategory, setNewCategory] = useState(null);
  const { updateTransactionCategory } = useTransactions();
  const [saving, setSaving] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {showCategoryPicker ? "Choose a category" : "Edit transaction"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showCategoryPicker ? (
            <CategoryPicker
              onSelect={(newCategory) => {
                toggleCategoryPicker();
                setNewCategory(newCategory);
              }}
            />
          ) : (
            <VStack align="left">
              <Text>{transaction.text}</Text>
              <Divider />
              <Text>{formatReadableDate(transaction.accountingDate)}</Text>
              <Divider />
              <Text>{transaction.accountName}</Text>
              <Divider />
              <HStack justify="space-between">
                <HStack>
                  <CategoryIcon
                    color={
                      newCategory
                        ? newCategory.color
                        : transaction.categoryColor
                    }
                    size="sm"
                  />
                  <Text>
                    {newCategory ? newCategory.name : transaction.categoryName}
                  </Text>
                </HStack>
                <Button variant="outline" onClick={toggleCategoryPicker}>
                  Change category
                </Button>
              </HStack>
              <Divider />
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          {showCategoryPicker ? (
            <Button onClick={() => toggleCategoryPicker()}>Cancel</Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  if (!newCategory) {
                    onClose();
                    return;
                  }
                  setSaving(true);
                  updateTransactionCategory(transaction, newCategory.id).then(
                    () => {
                      onClose();
                      setSaving(false);
                    }
                  );
                }}
                mr="8px"
                colorScheme="green"
                isLoading={saving}
              >
                Save
              </Button>
              <Button onClick={onClose}>Close</Button>
            </>
          )}
        </ModalFooter>
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
