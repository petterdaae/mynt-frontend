import { useMemo } from "react";
import { BudgetItem, Category, RichTransaction, Spending } from "../types";
import { useRichTransactions, useBudgetItems, useSettings } from "./index";

function useSpendings(fromDate: string, toDate: string) {
  const {
    transactions,
    loading: richTransactionsLoading,
    categories,
    update,
    updateCategorizationsForTransaction,
  } = useRichTransactions(fromDate, toDate);
  const { budgetItems, loading: budgetItemsLoading } = useBudgetItems();
  const { settings, loading: settingsLoading } = useSettings();
  const loading =
    richTransactionsLoading || budgetItemsLoading || settingsLoading;
  const spendings = useMemo(
    () =>
      loading
        ? []
        : calculateSpendings(
            null,
            categories,
            transactions,
            budgetItems.filter((bi) => bi.budgetId === settings?.mainBudgetId)
          ),
    [categories, transactions, loading, budgetItems, settings]
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
function calculateSpendings(
  id: number | null,
  categories: Category[],
  transactions: RichTransaction[],
  budgetItems: BudgetItem[]
): Spending[] {
  const spendings: Spending[] = [];

  // Create a new spending for each category
  const category = categories.find((c) => c.id === id) ?? null;
  const currentBudgetItems = budgetItems.filter((bi) => bi.categoryId === id);

  const spending = {
    category,
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
    positiveBudget: currentBudgetItems.reduce(
      (acc, bi) =>
        acc + (bi.monthlyAmount && bi.monthlyAmount > 0 ? bi.monthlyAmount : 0),
      0
    ),
    negativeBudget: currentBudgetItems.reduce(
      (acc, bi) =>
        acc + (bi.monthlyAmount && bi.monthlyAmount < 0 ? bi.monthlyAmount : 0),
      0
    ),
  };

  // Add amounts of transactions that are in the category
  if (!spending.category?.ignore) {
    for (const transaction of transactions) {
      for (const categorization of transaction.categorizations) {
        if (categorization.categoryId === id) {
          spending.amount += categorization.amount;
          if (categorization.amount > 0) {
            spending.positiveAmount += categorization.amount;
          } else {
            spending.negativeAmount += categorization.amount;
          }
        }
      }
    }
  }

  // Recursively add amounts of transactions that are in subcategories
  for (const child of categories.filter((c) => c.parentId === id)) {
    const childSpendings = calculateSpendings(
      child.id,
      categories,
      transactions,
      budgetItems
    );
    if (!spending.category?.ignore) {
      spending.amount += childSpendings[0].amount;
      spending.positiveAmount += childSpendings[0].positiveAmount;
      spending.negativeAmount += childSpendings[0].negativeAmount;
    }
    spending.positiveBudget += childSpendings[0].positiveBudget;
    spending.negativeBudget += childSpendings[0].negativeBudget;

    Array.prototype.push.apply(spendings, childSpendings);
  }

  return [spending, ...spendings];
}

export default useSpendings;
