import { Badge, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { formatCurrency, formatReadableDate } from "../utils";
import EditTransactionModal from "../EditTransaction/EditTransactionModal";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { useCallback, useMemo, useState, memo } from "react";
import { RichTransaction, Category } from "../../types";

interface Props {
  transaction: RichTransaction;
  updateCategorizationsForTransaction: any;
  updateTransaction: any;
  categories: Category[];
  loading: boolean;
}

function Transaction({
  transaction,
  updateCategorizationsForTransaction,
  updateTransaction,
  categories,
  loading,
}: Props) {
  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState(false);

  const onClose = useCallback(() => {
    setShowEditTransactionModal(false);
  }, [setShowEditTransactionModal]);

  const onClick = useCallback(() => {
    setShowEditTransactionModal(true);
  }, [setShowEditTransactionModal]);

  const readableAccountingDate = useMemo(
    () =>
      formatReadableDate(transaction.customDate ?? transaction.accountingDate),
    [transaction]
  );

  const formattedCurrency = useMemo(
    () => formatCurrency(transaction.amount),
    [transaction]
  );

  return (
    <>
      <HStack
        justify="space-between"
        m="4px"
        p="4px"
        borderRadius="md"
        _hover={{ background: "whitesmoke", cursor: "pointer" }}
        onClick={onClick}
      >
        <HStack>
          <CategoryIcon
            color={transaction?.firstCategory?.color ?? "lightgray"}
            size="md"
          />
          <VStack align="left" spacing="1px">
            <Text fontSize="sm">{readableAccountingDate}</Text>
            <Text fontWeight="bold">
              {transaction.prettyName ?? transaction.text}
            </Text>
            <Text fontSize="sm">{transaction.account.name}</Text>
          </VStack>
        </HStack>
        <Box>
          <Badge
            colorScheme={transaction.amount >= 0 ? "blue" : "red"}
            fontSize="1.0em"
          >
            {formattedCurrency}
          </Badge>
        </Box>
      </HStack>
      <EditTransactionModal
        transaction={transaction}
        isOpen={showEditTransactionModal}
        onClose={onClose}
        updateCategorizationsForTransaction={
          updateCategorizationsForTransaction
        }
        updateTransaction={updateTransaction}
        categories={categories}
        loading={loading}
      />
    </>
  );
}

export default memo(Transaction);
