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
  const { updateTransactionCategory, updateTransactionCustomDate } =
    useTransactions();

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

  const [customDateOpen, setCustomDateOpen] = useState(transaction.customDate);

  const newCategoryChanged =
    newCategory && newCategory.id !== transaction.categoryId;

  const newCustomDateChanged = customDateOpen
    ? !customDateError && customDate !== transaction.customDate
    : transaction.customDate;

  const onSave = useCallback(() => {
    onClose();
    if (newCategoryChanged) {
      updateTransactionCategory(transaction, newCategory.id);
    }
    if (newCustomDateChanged) {
      const nullableNewCustomDate = customDateOpen ? customDate : null;
      updateTransactionCustomDate(transaction, nullableNewCustomDate);
    }
  }, [
    transaction,
    newCategory,
    onClose,
    updateTransactionCategory,
    newCategoryChanged,
    newCustomDateChanged,
  ]);

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
            customDateOpen={Boolean(customDateOpen)}
            setCustomDateOpen={setCustomDateOpen}
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
        <Button
          onClick={onSave}
          mr="8px"
          colorScheme="green"
          disabled={!(newCategoryChanged || newCustomDateChanged)}
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
