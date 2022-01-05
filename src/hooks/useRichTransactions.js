import { useMemo } from "react";
import { useTransactions, useAccounts, useCategories } from "./index";
import useCategorizations from "./useCategorizations";

function useRichTransactions(fromDate, toDate) {
  const transactions = useTransactions(fromDate, toDate);
  const accounts = useAccounts();
  const categories = useCategories();
  const categorizations = useCategorizations();

  const richTransactions = useMemo(() => {
    return transactions.transactions.map((transaction) => {
      const categorization = categorizations.categorizations.find(
        (categorization) => categorization.transactionId === transaction.id
      );
      const account = accounts.find(
        (account) => account.id === transaction.accountId
      );
      const category = categories.find(
        (category) => category.id === categorization.categoryId
      );
      return {
        ...transaction,
        account,
        category,
        categorization,
      };
    });
  }, [transactions, accounts, categories, categorizations]);

  return {
    transactions: richTransactions,
    accounts,
    categories,
    categorizations,
    loading:
      transactions.loading ||
      accounts.loading ||
      categories.loading ||
      categorizations.loading,
  };
}

export default useRichTransactions;
