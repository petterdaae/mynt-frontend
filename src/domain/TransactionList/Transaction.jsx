import { Badge, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { formatCurrency, formatReadableDate } from "../utils";
import Proptypes from "prop-types";
import EditTransactionModal from "../EditTransaction/EditTransactionModal";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { useCallback, useMemo, useState, memo } from "react";
import { useCategories } from "../../hooks/domain/useCategories";
import { useAccounts } from "../../hooks/domain/useAccounts";

function Transaction({ transaction }) {
  const { accounts, accountsLoading } = useAccounts();
  const { categories, categoriesLoading } = useCategories();

  const richTransaction = useMemo(() => {
    if (accountsLoading || categoriesLoading) return;
    const account = accounts.find(
      (account) => account.id === transaction.account_id
    );
    const category = categories.find(
      (category) => category.id === transaction.category_id
    );
    return {
      id: transaction.id,
      text: transaction.text,
      amount: transaction.amount,
      accountingDate: transaction.accounting_date,
      interestDate: transaction.interest_date,
      categoryName: category ? category.name : "No category",
      categoryColor: category ? category.color : "lightgray",
      accountName: account.name,
      accountNumber: account.account_number,
    };
  }, [accounts, categories, transaction, accountsLoading, categoriesLoading]);

  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState(false);

  const onClose = useCallback(() => {
    setShowEditTransactionModal(false);
  }, [setShowEditTransactionModal]);

  const onClick = useCallback(() => {
    setShowEditTransactionModal(true);
  }, [setShowEditTransactionModal]);

  const readableAccountingDate = useMemo(
    () => formatReadableDate(richTransaction.accountingDate),
    [richTransaction]
  );

  const formattedCurrency = useMemo(
    () => formatCurrency(richTransaction.amount),
    [richTransaction]
  );

  return (
    !accountsLoading &&
    !categoriesLoading && (
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
            <CategoryIcon color={richTransaction.categoryColor} />
            <VStack align="left" spacing="1px">
              <Text fontSize="sm">{readableAccountingDate}</Text>
              <Text fontWeight="bold">{richTransaction.text}</Text>
              <Text fontSize="sm">{richTransaction.accountName}</Text>
            </VStack>
          </HStack>
          <Box>
            <Badge
              colorScheme={richTransaction.amount >= 0 ? "green" : "red"}
              fontSize="1.0em"
            >
              {formattedCurrency}
            </Badge>
          </Box>
        </HStack>
        <EditTransactionModal
          transaction={richTransaction}
          isOpen={showEditTransactionModal}
          onClose={onClose}
        />
      </>
    )
  );
}

Transaction.propTypes = {
  transaction: Proptypes.object.isRequired,
};

export default memo(Transaction);
