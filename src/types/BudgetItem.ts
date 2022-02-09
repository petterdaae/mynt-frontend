interface BudgetItem {
  id: number;
  budgetId: number;
  categoryId: number;
  negativeAmount: number | null;
  positiveAmount: number | null;
  name: string;
}

export default BudgetItem;
