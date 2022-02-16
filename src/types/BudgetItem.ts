import BudgetItemCustomItem from "./BudgetItemCustomItem";

interface BudgetItem {
  id: number;
  budgetId: number;
  categoryId: number;
  monthlyAmount: number | null;
  customItems: BudgetItemCustomItem[] | null;
  kind: string;
  name: string;
}

export default BudgetItem;
