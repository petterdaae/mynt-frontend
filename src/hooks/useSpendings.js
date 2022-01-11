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
  const category = categories.find((c) => c.id === id) ?? {
    id: null,
    name: "Unknown",
    parentId: null,
    color: "lightgray",
    ignore: false,
    budget: null,
  };

  const spending = {
    category,
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
    budget: category.budget ?? 0,
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
    const childSpendings = calculateSpendings(
      child.id,
      categories,
      transactions
    );
    if (!spending.category.ignore) {
      spending.amount += childSpendings[0].amount;
      spending.positiveAmount += childSpendings[0].positiveAmount;
      spending.negativeAmount += childSpendings[0].negativeAmount;
      spending.budget += childSpendings[0].budget ?? 0;
    }

    Array.prototype.push.apply(spendings, childSpendings);
  }

  spending.estimated = Math.min(
    -spending.budget + spending.negativeAmount, // how much is left of budget?
    spending.negativeAmount
  );

  return [spending, ...spendings];
}

export default useSpendings;
