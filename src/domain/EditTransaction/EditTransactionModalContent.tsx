import {
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Text,
  Divider,
  Badge,
  HStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import CustomDate from "./CustomDate";
import Categorizations from "./Categorizations";
import { useCallback, useState } from "react";
import { formatCurrency } from "../utils";
import { RichTransaction, SetState, NewCategorization } from "../../types";

interface Props {
  transaction: RichTransaction;
  onClose: () => void;
  updateCategorizationsForTransaction: (
    transaction: RichTransaction,
    categorizations: NewCategorization[]
  ) => void;
  updateTransaction: (transaction: RichTransaction) => void;
  newCategorizations: NewCategorization[];
  setNewCategorizations: SetState<NewCategorization[]>;
  setCategorizationBeingEdited: SetState<number | null>;
}

function EditTransactionModalContent({
  transaction,
  onClose,
  updateCategorizationsForTransaction,
  updateTransaction,
  newCategorizations,
  setNewCategorizations,
  setCategorizationBeingEdited,
}: Props) {
  const [customDateError, setCustomDateError] = useState<string | null>(null);
  const [customDate, setCustomDate] = useState(
    transaction.customDate
      ? transaction.customDate
      : transaction.accountingDate.split("T")[0]
  );
  const [customDateOpen, setCustomDateOpen] = useState(
    !!transaction.customDate
  );
  const [categorizationsError, setCategorizationsError] = useState<
    string | null
  >(null);

  const onSave = useCallback(() => {
    onClose();
    const mappedNewCategorizations = newCategorizations.map((c) => ({
      ...c,
      amount: c.newAmount ? parseFloat(c.newAmount) * 100 : c.amount,
      categoryId: c.categoryId,
    }));
    updateCategorizationsForTransaction(transaction, mappedNewCategorizations);
    const nullableNewCustomDate = customDateOpen ? customDate : null;
    updateTransaction({ ...transaction, customDate: nullableNewCustomDate });
  }, [
    transaction,
    onClose,
    updateTransaction,
    updateCategorizationsForTransaction,
    newCategorizations,
    customDate,
    customDateOpen,
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
          <Text fontSize="sm">Amount</Text>
          <HStack>
            <Badge colorScheme={transaction.amount >= 0 ? "blue" : "red"}>
              {formatCurrency(transaction.amount)}
            </Badge>
          </HStack>
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
          <Text fontWeight="semibold">{transaction.account.name}</Text>
          <Divider />
          <Categorizations
            setCategorizationBeingEdited={setCategorizationBeingEdited}
            newCategorizations={newCategorizations}
            setNewCategorizations={setNewCategorizations}
            categorizationsError={categorizationsError}
            setCategorizationsError={setCategorizationsError}
            transaction={transaction}
          />
          <Divider />
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={onSave}
          mr="8px"
          colorScheme="green"
          disabled={!!(customDateError || categorizationsError)}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            onClose();
            setNewCategorizations(
              transaction.categorizations.map((c) => ({
                ...c,
                newAmount: "",
              }))
            );
          }}
        >
          Close
        </Button>
      </ModalFooter>
    </>
  );
}

EditTransactionModalContent.propTypes = {
  transaction: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  updateCategorizationsForTransaction: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  newCategorizations: PropTypes.array.isRequired,
  setNewCategorizations: PropTypes.func.isRequired,
  setCategorizationBeingEdited: PropTypes.func.isRequired,
};

export default EditTransactionModalContent;
