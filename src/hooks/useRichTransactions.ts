import { useMemo } from "react";
import { Category, RichTransaction, Account } from "../types";
import RichCategorization from "../types/RichCategorization";
import {
  useTransactions,
  useAccounts,
  useCategories,
  useCategorizations,
} from "./index";

function useRichTransactions(fromDate: string, toDate: string) {
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

  const richTransactions = useMemo<RichTransaction[]>(() => {
    if (loading) return [];
    const richCategorizations: RichCategorization[] = categorizations.map(
      (c) => ({
        ...c,
        category: categories.find((cat) => cat.id === c.categoryId) as Category, // TODO: codesmell?
      })
    );

    return transactions.map((t) => {
      const firstCategorization =
        categorizations.find((c) => c.transactionId === t.id) ?? null;
      const account = accounts.find((a) => a.id === t.accountId) as Account; // TODO: codesmell?
      const firstCategory =
        categories.find((c) => c.id === firstCategorization?.categoryId) ??
        null;
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
