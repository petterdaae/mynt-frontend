interface BudgetItem {
  id: number;
  budgetId: number;
  categoryId: number;
  monthlyAmount: number | null;
  name: string;
}

export default BudgetItem;
