import { useCallback, useMemo } from "react";
import { Category, RichTransaction, Account } from "../types";
import RichCategorization from "../types/RichCategorization";
import {
  useTransactions,
  useAccounts,
  useCategories,
  useCategorizations,
} from "./index";
import useNames from "./useNames";

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
  const { elements: names, loading: namesLoading } = useNames();

  const regexNames = useMemo(
    () =>
      names.map((name) => [
        new RegExp(name.fields.regex),
        name.fields.replaceWith,
      ]),
    [names]
  );

  const prettyName = useCallback(
    (name) => {
      for (const [regex, replaceWith] of regexNames) {
        if ((regex as RegExp).test(name)) {
          return replaceWith as string;
        }
      }
      return null;
    },
    [regexNames]
  );

  const loading =
    transactionsLoading ||
    accountsLoading ||
    categoriesLoading ||
    categorizationsLoading ||
    namesLoading;

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
        prettyName: prettyName(t.text),
      };
    });
  }, [
    loading,
    categorizations,
    transactions,
    categories,
    accounts,
    prettyName,
  ]);

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
