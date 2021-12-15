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
import CustomDate from "./CustomDate";
import { useCallback, useState } from "react";

function EditTransactionModalContent({
  transaction,
  onClose,
  toggleCategoryPicker,
  newCategory,
}) {
  const { updateTransactionCategory } = useTransactions();

  const categoryColor = newCategory
    ? newCategory.color
    : transaction.categoryColor;

  const categoryName = newCategory
    ? newCategory.name
    : transaction.categoryName;

  const [customDateError, setCustomDateError] = useState(null);

  const [customDate, setCustomDate] = useState(
    transaction.customDate
      ? transaction.customDate
      : transaction.accountingDate.split("T")[0]
  );

  const onSave = useCallback(() => {
    onClose();
    if (newCategory) updateTransactionCategory(transaction, newCategory.id);
  });

  return (
    <>
      <ModalHeader>Edit transaction</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack align="left">
          <Text fontSize="sm">Description</Text>
          <Text fontWeight="semibold">{transaction.text}</Text>
          <Divider />
          <CustomDate
            transaction={transaction}
            customDate={customDate}
            setCustomDate={setCustomDate}
            error={customDateError}
            setError={setCustomDateError}
          />
          <Divider />
          <Text fontSize="sm">Account</Text>
          <Text fontWeight="semibold">{transaction.accountName}</Text>
          <Divider />
          <HStack justify="space-between">
            <HStack>
              <CategoryIcon color={categoryColor} size="sm" />
              <Text fontWeight="semibold">{categoryName}</Text>
            </HStack>
            <Button variant="outline" onClick={toggleCategoryPicker}>
              Change category
            </Button>
          </HStack>
          <Divider />
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onSave} mr="8px" colorScheme="green">
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
