import {
  Account,
  Category,
  Categorization,
  Transaction,
  RichCategorization,
} from ".";

interface RichTransaction extends Transaction {
  account: Account;
  firstCategory: Category | null; // TODO: remove
  firstCategorization: Categorization | null; // TODO: remove
  categorizations: RichCategorization[];
}

export default RichTransaction;
