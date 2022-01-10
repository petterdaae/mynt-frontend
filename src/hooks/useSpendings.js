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
    () => (loading ? [] : calculateSpendings(null, categories, transactions)),
    [categories, transactions]
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

// Recursively calculates spendings for each category with subcategories
function calculateSpendings(id, categories, transactions) {
  const spendings = [];

  // Create a new spending for each category
  const spending = {
    category: categories.find((c) => c.id === id) ?? {
      id: null,
      name: "Uncategorized",
      parentId: null,
      color: "lightgray",
      ignore: false,
    },
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
  };

  // Add amounts of transactions that are in the category
  if (!spending.category.ignore) {
    for (const transaction of transactions) {
      if (!transaction.categorization) continue;
      if (transaction.categorization.categoryId === id) {
        spending.amount += transaction.amount;
        spending.positiveAmount +=
          transaction.amount > 0 ? transaction.amount : 0;
        spending.negativeAmount +=
          transaction.amount < 0 ? transaction.amount : 0;
      }
    }
  }

  // Recursively add amounts of transactions that are in subcategories
  for (const child of categories.filter((c) => c.parentId === id)) {
    const [childSpending] = calculateSpendings(
      child.id,
      categories,
      transactions
    );
    if (!spending.category.ignore) {
      spending.amount += childSpending.amount;
      spending.positiveAmount += childSpending.positiveAmount;
      spending.negativeAmount += childSpending.negativeAmount;
    }
    spendings.push(childSpending);
  }

  return [spending, ...spendings];
}

export default useSpendings;
