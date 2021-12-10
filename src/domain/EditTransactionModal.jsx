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
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import CategoryIcon from "./CategoryIcon";
import { formatReadableDate } from "./transactionListUtils";

function EditTransactionModal({ transaction, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
              <Button variant="outline">Change category</Button>
            </HStack>
            <Divider />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr="8px" colorScheme="green">
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
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
