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
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import CategoryPicker from "../CategoryPicker/CategoryPicker";
import { useState } from "react";
import { useTransactions } from "../../hooks/domain/useTransactions";
import Date from "./Date";

function EditTransactionModal({ transaction, isOpen, onClose }) {
  const [showCategoryPicker, { toggle: toggleCategoryPicker }] =
    useBoolean(false);
  const [newCategory, setNewCategory] = useState(null);
  const { updateTransactionCategory } = useTransactions();
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
              <Text fontSize="sm">Description</Text>
              <Text fontWeight="semibold">{transaction.text}</Text>
              <Divider />
              <Date transaction={transaction} />
              <Divider />
              <Text fontSize="sm">Account</Text>
              <Text fontWeight="semibold">{transaction.accountName}</Text>
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
                  <Text fontWeight="semibold">
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
                onClick={async () => {
                  onClose();
                  if (newCategory)
                    updateTransactionCategory(transaction, newCategory.id);
                }}
                mr="8px"
                colorScheme="green"
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
