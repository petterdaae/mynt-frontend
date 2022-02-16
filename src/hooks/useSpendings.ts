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
            budgetItems.filter((bi) => bi.budgetId === settings?.mainBudgetId),
            fromDate,
            toDate
          ),
    [
      loading,
      categories,
      transactions,
      budgetItems,
      fromDate,
      toDate,
      settings?.mainBudgetId,
    ]
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
  budgetItems: BudgetItem[],
  fromDate: string,
  toDate: string
): Spending[] {
  const spendings: Spending[] = [];

  // Create a new spending for each category
  const category = categories.find((c) => c.id === id) ?? null;
  const currentBudgetItems = budgetItems.filter((bi) => bi.categoryId === id);

  const [positiveBudget, negativeBudget] = currentBudgetItems.reduce(
    (acc, bi) => {
      if (bi.kind === "monthly") {
        return [
          acc[0] +
            (bi.monthlyAmount && bi.monthlyAmount > 0 ? bi.monthlyAmount : 0),
          acc[1] +
            (bi.monthlyAmount && bi.monthlyAmount < 0 ? bi.monthlyAmount : 0),
        ];
      }

      if (bi.kind === "custom") {
        if (bi.customItems) {
          const filteredCustomItems = bi.customItems.filter(
            (ci) => ci.date <= toDate && ci.date >= fromDate
          );
          return [
            acc[0] +
              filteredCustomItems.reduce(
                (acc2, ci) => acc2 + (ci.amount > 0 ? ci.amount : 0),
                0
              ),
            acc[1] +
              filteredCustomItems.reduce(
                (acc2, ci) => acc2 + (ci.amount > 0 ? ci.amount : 0),
                0
              ),
          ];
        }
      }

      return acc;
    },
    [0, 0]
  );

  const spending = {
    category,
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
    positiveBudget,
    negativeBudget,
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
      budgetItems,
      fromDate,
      toDate
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
