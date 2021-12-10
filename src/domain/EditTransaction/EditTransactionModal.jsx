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

function EditTransactionModal({ transaction, isOpen, onClose }) {
  const [showCategoryPicker, { toggle: toggleCategoryPicker }] =
    useBoolean(false);
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
            <CategoryPicker onSelect={() => toggleCategoryPicker()} />
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
                  <CategoryIcon color={transaction.categoryColor} size="sm" />
                  <Text>{transaction.categoryName}</Text>
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
              <Button onClick={onClose} mr="8px" colorScheme="green">
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
