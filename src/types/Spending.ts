import { Category } from ".";

interface Spending {
  category: Category | null;
  amount: number;
  positiveAmount: number;
  negativeAmount: number;
  positiveBudget: number;
  negativeBudget: number;
}

export default Spending;
