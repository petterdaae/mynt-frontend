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
  IconButton,
} from "@chakra-ui/react";
import CustomDate from "./CustomDate";
import Categorizations from "./Categorizations";
import { useCallback, useState } from "react";
import { formatCurrency } from "../utils";
import {
  RichTransaction,
  SetState,
  Categorization,
  EditableCategorization,
  Transaction,
} from "../../types";
import { BsGear } from "react-icons/bs";
import EditTransctionSettingsType from "../../types/EditTransctionSettings";
import ChangeCategory from "./ChangeCategory";

interface Props {
  transaction: RichTransaction;
  onClose: () => void;
  updateCategorizationsForTransaction: (
    transaction: RichTransaction,
    categorizations: Categorization[]
  ) => void;
  updateTransaction: (transaction: Transaction) => void;
  categorizations: EditableCategorization[];
  setCategorizations: SetState<EditableCategorization[]>;
  setCategorizationBeingEdited: SetState<number | null>;
  setSettingsOpen: SetState<boolean>;
  settings: EditTransctionSettingsType;
}

function EditTransactionModalContent({
  transaction,
  onClose,
  updateCategorizationsForTransaction,
  updateTransaction,
  categorizations,
  setCategorizations,
  setCategorizationBeingEdited,
  setSettingsOpen,
  settings,
}: Props) {
  const [customDateError, setCustomDateError] = useState<string | null>(null);
  const [customDate, setCustomDate] = useState(
    transaction.customDate
      ? transaction.customDate
      : transaction.accountingDate.split("T")[0]
  );
  const [categorizationsError, setCategorizationsError] = useState<
    string | null
  >(null);

  const onSave = useCallback(() => {
    onClose();
    const mappedNewCategorizations = categorizations
      .filter((c) => !!c.category)
      .map((c) => ({
        ...c,
        amount: c.amount as number,
        categoryId: c.category?.id as number,
      }));

    updateCategorizationsForTransaction(transaction, mappedNewCategorizations);
    const nullableNewCustomDate = settings.customDate ? customDate : null;
    updateTransaction({ ...transaction, customDate: nullableNewCustomDate });
  }, [
    transaction,
    onClose,
    updateTransaction,
    updateCategorizationsForTransaction,
    categorizations,
    customDate,
    settings.customDate,
  ]);

  return (
    <>
      <ModalHeader>Edit transaction</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack align="left">
          <HStack justify="space-between">
            <VStack align="left">
              <Text fontSize="sm" fontWeight="semibold">
                Amount
              </Text>
              <Badge
                colorScheme={transaction.amount >= 0 ? "blue" : "red"}
                fontSize="1em"
              >
                {formatCurrency(transaction.amount)}
              </Badge>
            </VStack>
            <VStack>
              <Text fontSize="sm" fontWeight="semibold">
                Bank
              </Text>
              <Text>Sbanken</Text>
            </VStack>
            <VStack align="right">
              <Text fontSize="sm" align="right" fontWeight="semibold">
                Account
              </Text>
              <Text align="right">{transaction.account.name}</Text>
            </VStack>
          </HStack>
          <Divider />
          <Text fontSize="sm" fontWeight="semibold">
            Description
          </Text>
          <Text>{transaction.text}</Text>
          <Divider />
          <CustomDate
            transaction={transaction}
            customDate={customDate}
            setCustomDate={setCustomDate}
            error={customDateError}
            setError={setCustomDateError}
            customDateOpen={settings.customDate}
          />
          <Divider />
          {(categorizations.length !== 1 || settings.splitTransaction) && (
            <>
              <Categorizations
                setCategorizationBeingEdited={setCategorizationBeingEdited}
                categorizations={categorizations}
                setCategorizations={setCategorizations}
                categorizationsError={categorizationsError}
                setCategorizationsError={setCategorizationsError}
                transaction={transaction}
              />
              <Divider />
            </>
          )}
          {categorizations.length === 1 && !settings.splitTransaction && (
            <>
              <ChangeCategory
                setCategorizationBeingEdited={setCategorizationBeingEdited}
                categorization={categorizations[0]}
              />
              <Divider />
            </>
          )}
        </VStack>
      </ModalBody>
      <ModalFooter>
        <IconButton
          aria-label="More"
          icon={<BsGear />}
          onClick={() => setSettingsOpen(true)}
          mr="8px"
        />
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
          }}
        >
          Close
        </Button>
      </ModalFooter>
    </>
  );
}

export default EditTransactionModalContent;
