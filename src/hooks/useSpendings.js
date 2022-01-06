import { useMemo } from "react";
import { useRichTransactions } from "./index";

function useSpendings(fromDate, toDate) {
  const {
    transactions,
    loading,
    categories,
    update,
    updateCategorizationsForTransaction,
  } = useRichTransactions(fromDate, toDate);
  const spendings = useMemo(() => getSpendings(transactions), [transactions]);
  return {
    transactions,
    spendings,
    categories,
    loading,
    updateTransaction: update,
    updateCategorizationsForTransaction,
  };
}

function getSpendings(transactions) {
  const spendings = new Map();
  for (const transaction of transactions) {
    if (!transaction.categorization) continue;
    const spending = spendings.get(transaction.category.id);
    if (spending) {
      spending.amount += transaction.amount;
    } else {
      spendings.set(transaction.category.id, {
        category: transaction.category,
        amount: transaction.amount,
        positiveAmount: transaction.amount >= 0 ? transaction.amount : 0,
        negativeAmount: transaction.amount < 0 ? transaction.amount : 0,
      });
    }
  }
  spendings.set(null, {
    category: {
      id: null,
      color: "lightgray",
      name: "Uncategorized",
    },
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
  });
  groupSpendings(null, spendings);
  return Array.from(spendings.values());
}

function groupSpendings(parentCategoryId, spendings) {
  const current = spendings.get(parentCategoryId);
  for (const spending of spendings.values()) {
    if (spending.category.parentId === parentCategoryId) {
      current.amount += spending.amount;
      current.positiveAmount += spending.positiveAmount;
      current.negativeAmount += spending.negativeAmount;
      groupSpendings(spending.category.id, spendings);
    }
  }
}

export default useSpendings;
