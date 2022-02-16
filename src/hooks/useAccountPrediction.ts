import { useMemo } from "react";
import { useAccounts, useBudgetItems, useSettings } from ".";
import { Account, BudgetItem } from "../types";

function useAccountPrediction() {
  const { accounts, loading: accountsLoading } = useAccounts();
  const { settings, loading: settingsLoading } = useSettings();
  const { budgetItems, loading: budgetItemsLoading } = useBudgetItems();

  const predictions = useMemo(
    () =>
      calculatePredictions(
        accounts,
        budgetItems.filter((bi) => bi.budgetId === settings?.mainBudgetId)
      ),
    [accounts, budgetItems, settings?.mainBudgetId]
  );

  const loading = accountsLoading || settingsLoading || budgetItemsLoading;

  return {
    predictions,
    loading,
  };
}

function calculatePredictions(accounts: Account[], budgetItems: BudgetItem[]) {
  let currentAmount = accounts.reduce(
    (acc, account) => acc + account.available,
    0
  );

  // TODO: Backtrack?
  // TODO: Make dynamic
  // TODO: Check how much is left of the budget this month

  const months = [
    // ["2022-01-01", "2022-02-01"],
    // ["2022-02-01", "2022-03-01"],
    ["2022-03-01", "2022-04-01"],
    ["2022-04-01", "2022-05-01"],
    ["2022-05-01", "2022-06-01"],
    ["2022-06-01", "2022-07-01"],
    ["2022-07-01", "2022-08-01"],
    ["2022-08-01", "2022-09-01"],
  ];

  let currentMonth = 2;

  const predictions = [
    {
      month: currentMonth,
      amount: currentAmount,
    },
  ];

  for (const month of months) {
    currentMonth++;

    for (const budgetItem of budgetItems) {
      if (budgetItem.kind === "monthly") {
        currentAmount += budgetItem.monthlyAmount ?? 0;
      }

      if (budgetItem.kind === "custom") {
        const filteredCustomItems =
          budgetItem.customItems?.filter(
            (ci) => ci.date >= month[0] && ci.date < month[1]
          ) ?? [];
        currentAmount += filteredCustomItems.reduce(
          (acc, ci) => acc + ci.amount,
          0
        );
      }
    }
    predictions.push({
      month: currentMonth,
      amount: currentAmount,
    });
  }

  return predictions;
}

export default useAccountPrediction;
