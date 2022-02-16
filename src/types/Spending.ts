import { Category } from ".";

interface Spending {
  category: Category | null;
  amount: number;
  positiveAmount: number;
  negativeAmount: number;
  positiveBudget: number;
  negativeBudget: number;
  remainingPositiveBudget: number;
  remainingNegativeBudget: number;
}

export default Spending;
