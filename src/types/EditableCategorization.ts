import { Category } from ".";

interface EditableCategorization {
  id: number;
  transactionId: string;
  amount: number | null;
  category: Category | null;
}

export default EditableCategorization;
