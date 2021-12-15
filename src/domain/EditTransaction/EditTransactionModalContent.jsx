import {
  Button,
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
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { useTransactions } from "../../hooks/domain/useTransactions";
import Date from "./CustomDate";

function EditTransactionModalContent({
  transaction,
  onClose,
  toggleCategoryPicker,
  newCategory,
}) {
  const { updateTransactionCategory } = useTransactions();
  return (
    <>
      <ModalHeader>Edit transaction</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
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
                  newCategory ? newCategory.color : transaction.categoryColor
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
      </ModalBody>
      <ModalFooter>
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
      </ModalFooter>
    </>
  );
}

EditTransactionModalContent.propTypes = {
  transaction: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  toggleCategoryPicker: PropTypes.func.isRequired,
  newCategory: PropTypes.object,
};

export default EditTransactionModalContent;
