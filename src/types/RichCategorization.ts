import { Category, Categorization } from ".";

interface RichCategorization extends Categorization {
  category: Category;
}

export default RichCategorization;
