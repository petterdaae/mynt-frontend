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
  const spendings = useMemo(
    () => getSpendings(transactions, categories),
    [transactions, categories]
  );
  return {
    transactions,
    spendings,
    categories,
    loading,
    updateTransaction: update,
    updateCategorizationsForTransaction,
  };
}

function getSpendings(transactions, categories) {
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
  groupSpendings(null, spendings, categories);
  return Array.from(spendings.values());
}

function groupSpendings(parentCategoryId, spendings, categories) {
  const current = spendings.get(parentCategoryId);

  for (const spending of spendings.values()) {
    if (spending.category.parentId === parentCategoryId) {
      current.amount += spending.amount;
      current.positiveAmount += spending.positiveAmount;
      current.negativeAmount += spending.negativeAmount;

      const subCategories = groupSpendings(spending.category.id, spendings);
      current.amount += subCategories.amount;
      current.positiveAmount += subCategories.positiveAmount;
      current.negativeAmount += subCategories.negativeAmount;
    }
  }

  return {
    amount: current.amount,
    positiveAmount: current.positiveAmount,
    negativeAmount: current.negativeAmount,
  };
}

export default useSpendings;
