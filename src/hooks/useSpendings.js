import { useMemo } from "react";
import { useRichTransactions } from "./index";

function useSpendings(fromDate, toDate) {
  const { richTransactions, loading } = useRichTransactions(fromDate, toDate);
  const spendings = useMemo(
    () => getSpendings(richTransactions),
    [richTransactions]
  );
  return {
    transactions: richTransactions,
    spendings,
    loading,
  };
}

function getSpendings(richTransactions) {
  const spendings = new Map();
  for (const transaction of richTransactions) {
    const spending = spendings.get(transaction.category.id);
    if (spending) {
      spendings.amount += transaction.amount;
    } else {
      spendings.set(transaction.category.id, {
        category: transaction.category,
        amount: transaction.amount,
      });
    }
  }
  const groupedSpendings = groupSpendings(spendings);
  return Array.from(groupedSpendings.values());
}

function groupSpendings(parentCategoryId, spendings) {
  const groupedSpendings = new Map();
  const current = spendings.get(parentCategoryId);
  for (const spending of spendings) {
    if (spending.category.parentId === parentCategoryId) {
      current.amount += spending.amount;
      groupSpendings(spending.category.id, spendings);
    }
  }
  return groupedSpendings;
}

export default useSpendings;
