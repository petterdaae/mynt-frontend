import { Category } from ".";

interface Suggestion {
  pattern: string;
  category: Category | null;
}

export default Suggestion;
