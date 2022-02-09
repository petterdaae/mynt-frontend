import { Category } from ".";

interface Spending {
  category: Category;
  amount: number;
  positiveAmount: number;
  negativeAmount: number;
  positiveBudget: number;
  negativeBudget: number;
}

export default Spending;
