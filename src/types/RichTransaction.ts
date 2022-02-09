import { Account, Category, Categorization, Transaction } from ".";

interface RichTransaction extends Transaction {
  account: Account;
  firstCategory: Category | null; // TODO: remove
  firstCategorization: Categorization | null; // TODO: remove
  categorizations: Categorization[];
}

export default RichTransaction;
