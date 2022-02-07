import { useMemo } from "react";
import {
  useTransactions,
  useAccounts,
  useCategories,
  useCategorizations,
} from "./index";

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
    const richCategorizations = categorizations.map((c) => ({
      ...c,
      category: categories.find((cat) => cat.id === c.categoryId),
    }));

    return transactions.map((t) => {
      const firstCategorization = categorizations.find(
        (c) => c.transactionId === t.id
      );
      const account = accounts.find((a) => a.id === t.accountId);
      const firstCategory = firstCategorization
        ? categories.find((c) => c.id === firstCategorization.categoryId)
        : {
            id: null,
            color: "lightgray",
            name: "Uncategorized",
          };
      return {
        ...t,
        account,
        firstCategory: firstCategory,
        firstCategorization: firstCategorization,
        categorizations: richCategorizations.filter(
          (c) => c.transactionId === t.id
        ),
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
