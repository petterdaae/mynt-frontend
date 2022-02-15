interface BudgetItem {
  id: number;
  budgetId: number;
  categoryId: number;
  monthlyAmount: number | null;
  customItems: string | null;
  kind: string;
  name: string;
}

export default BudgetItem;
