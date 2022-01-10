import { useMemo } from "react";
import { useTransactions, useAccounts, useCategories } from "./index";
import useCategorizations from "./useCategorizations";

function useRichTransactions(fromDate, toDate) {
  const { categories, loading: categoriesLoading } = useCategories();
  const { accounts, loading: accountsLoading } = useAccounts();
  const {
    transactions,
    update,
    loading: transactionsLoading,
  } = useTransactions(fromDate, toDate);
  const {
    categorizations,
    loading: categorizationsLoading,
    updateCategorizationsForTransaction,
  } = useCategorizations(fromDate, toDate);

  const loading =
    transactionsLoading ||
    accountsLoading ||
    categoriesLoading ||
    categorizationsLoading;

  const richTransactions = useMemo(() => {
    if (loading) return [];
    return transactions.map((t) => {
      const categorization = categorizations.find(
        (c) => c.transactionId === t.id
      );
      const account = accounts.find((a) => a.id === t.accountId);
      const category = categorization
        ? categories.find((c) => c.id === categorization.categoryId)
        : {
            id: null,
            color: "lightgray",
            name: "Uncategorized",
          };
      return {
        ...t,
        account,
        category,
        categorization,
      };
    });
  }, [transactions, accounts, categories, categorizations, loading]);

  return {
    transactions: richTransactions,
    accounts,
    categories,
    categorizations,
    update,
    updateCategorizationsForTransaction,
    loading,
  };
}

export default useRichTransactions;
