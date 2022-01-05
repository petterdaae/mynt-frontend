import { useMemo } from "react";
import { useTransactions, useAccounts, useCategories } from "./index";
import useCategorizations from "./useCategorizations";

function useRichTransactions(fromDate, toDate) {
  const transactions = useTransactions(fromDate, toDate);
  const accounts = useAccounts();
  const categories = useCategories();
  const categorizations = useCategorizations();
  const loading =
    transactions.loading ||
    accounts.loading ||
    categories.loading ||
    categorizations.loading;

  const richTransactions = useMemo(() => {
    if (loading) return [];
    return transactions.transactions.map((transaction) => {
      const categorization = categorizations.categorizations.find(
        (categorization) => categorization.transactionId === transaction.id
      );
      const account = accounts.accounts.find(
        (account) => account.id === transaction.accountId
      );
      const category = categorization
        ? categories.categories.find(
            (category) => category.id === categorization.categoryId
          )
        : {
            id: null,
            color: "lightgray",
            name: "Uncategorized",
          };
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
    accounts: accounts.accounts,
    categories: categories.categories,
    categorizations,
    update: transactions.update,
    updateCategorizationsForTransaction:
      categorizations.updateCategorizationsForTransaction,
    loading:
      transactions.loading ||
      accounts.loading ||
      categories.loading ||
      categorizations.loading,
  };
}

export default useRichTransactions;
