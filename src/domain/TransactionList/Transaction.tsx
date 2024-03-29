import { Badge, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { formatCurrency, formatReadableDate } from "../utils";
import EditTransactionModal from "../EditTransaction/EditTransactionModal";
import SuggestIcon from "../Icons/SuggestIcon";
import { useCallback, useMemo, useState, memo } from "react";
import { RichTransaction, Category } from "../../types";
import CategoryIcon from "../Icons/CategoryIcon";

interface Props {
  transaction: RichTransaction;
  updateCategorizationsForTransaction: any;
  updateTransaction: any;
  categories: Category[];
  loading: boolean;
  suggest: (transaction: RichTransaction) => Category | null;
}

function Transaction({
  transaction,
  updateCategorizationsForTransaction,
  updateTransaction,
  categories,
  loading,
  suggest,
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

  const suggestion = useMemo(() => {
    return suggest(transaction);
  }, [suggest, transaction]);

  const smallText = useMemo(() => {
    const suggestionText = suggestion
      ? `Uncategorized (${suggestion.name}?)`
      : null;
    return transaction.firstCategory?.name ?? suggestionText ?? "Uncategorized";
  }, [suggestion, transaction.firstCategory?.name]);

  const acceptSuggestion = useCallback(
    () =>
      updateCategorizationsForTransaction(transaction, [
        {
          id: -1,
          transactionId: transaction.id,
          amount: transaction.amount,
          categoryId: suggestion?.id,
        },
      ]),
    [suggestion, transaction, updateCategorizationsForTransaction]
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
          {suggestion && transaction.firstCategory === null ? (
            <SuggestIcon size="md" onClick={acceptSuggestion} />
          ) : (
            <CategoryIcon
              color={transaction?.firstCategory?.color ?? "lightgray"}
              size="md"
            />
          )}
          <VStack align="left" spacing="1px">
            <Text fontSize="sm">{readableAccountingDate}</Text>
            <Text fontWeight="bold">
              {transaction.prettyName ?? transaction.text}
            </Text>
            <Text fontSize="sm">{smallText}</Text>
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
