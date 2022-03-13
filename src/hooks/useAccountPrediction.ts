import { useMemo } from "react";
import { useAccounts, useBudgetItems, useSettings, useSpendings } from ".";
import { Account, BudgetItem, Spending } from "../types";
import { formatDate, mod } from "../domain/utils";

function useAccountPrediction() {
  const { accounts, loading: accountsLoading } = useAccounts();
  const { settings, loading: settingsLoading } = useSettings();
  const { budgetItems, loading: budgetItemsLoading } = useBudgetItems();
  const { spendings, loading: spendingsLoading } = useSpendingsThisMonth();

  const loading =
    accountsLoading ||
    settingsLoading ||
    budgetItemsLoading ||
    spendingsLoading;

  const predictions = useMemo(
    () =>
      loading
        ? []
        : calculatePredictions(
            accounts,
            budgetItems.filter((bi) => bi.budgetId === settings?.mainBudgetId),
            spendings
          ),
    [accounts, budgetItems, settings?.mainBudgetId, spendings, loading]
  );

  return {
    predictions,
    loading,
  };
}

function getDateFromMonth(month: number, day: number): string {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(month / 12);
  const date = new Date(year, mod(month, 12), day);
  return formatDate(date);
}

function useSpendingsThisMonth() {
  const currentMonthIndex = useMemo(() => new Date().getMonth(), []);
  const fromDate = getDateFromMonth(currentMonthIndex, 1);
  const toDate = getDateFromMonth(currentMonthIndex + 1, 0);
  return useSpendings(fromDate, toDate);
}

function calculatePredictions(
  accounts: Account[],
  budgetItems: BudgetItem[],
  spendings: Spending[]
) {
  let currentAmount = accounts.reduce(
    (acc, account) => acc + account.available,
    0
  );

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const months: string[][] = [];

  for (let i = month + 1; i < 10; i++) {
    months.push([
      `${year}-${(i + 1).toString().padStart(2, "0")}-01`,
      `${year}-${(i + 2).toString().padStart(2, "0")}-01`,
    ]);
  }

  const topSpendingThisMonth = spendings.find((s) => s.category === null);

  const predictions = [
    {
      month: month + 1,
      initialAmount: currentAmount,
      amountAfterExpenses:
        currentAmount + (topSpendingThisMonth?.remainingNegativeBudget ?? 0),
      finalAmount:
        currentAmount +
        (topSpendingThisMonth?.remainingNegativeBudget ?? 0) +
        (topSpendingThisMonth?.remainingPositiveBudget ?? 0),
    },
  ];

  currentMonth = predictions[0].finalAmount;

  let currentMonth = month + 1;

  for (const month of months) {
    currentMonth++;
    let expenses = 0;
    const initialAmount = currentAmount;

    for (const budgetItem of budgetItems) {
      if (budgetItem.kind === "monthly") {
        currentAmount += budgetItem.monthlyAmount ?? 0;
        if (budgetItem.monthlyAmount && budgetItem.monthlyAmount < 0) {
          expenses += budgetItem.monthlyAmount;
        }
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

        expenses += filteredCustomItems.reduce(
          (acc, ci) => acc + (ci.amount < 0 ? ci.amount : 0),
          0
        );
      }
    }
    predictions.push({
      month: currentMonth,
      initialAmount,
      amountAfterExpenses: initialAmount + expenses,
      finalAmount: currentAmount,
    });
  }

  return predictions;
}

export default useAccountPrediction;
