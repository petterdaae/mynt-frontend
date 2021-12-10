import { useTransactions } from "./useTransactions";
import { useCategories } from "./useCategories";
import { useAccounts } from "./useAccounts";
import { useEffect, useState } from "react";

function useRichTransactions() {
  const [richTransactions, setRichTransactions] = useState([]);
  const { transactions, transactionsLoading, setFromAndToDate } =
    useTransactions();
  const { categories, categoriesLoading } = useCategories();
  const { accounts, accountsLoading } = useAccounts();

  useEffect(() => {
    if (transactionsLoading || categoriesLoading || accountsLoading) return;
    const richTransactions = transactions.map((transaction) => {
      const category = categories.find(
        (category) => category.id === transaction.category_id
      );
      const account = accounts.find(
        (account) => account.id === transaction.account_id
      );
      return {
        id: transaction.id,
        text: transaction.text,
        amount: transaction.amount,
        accountingDate: transaction.accounting_date,
        interestDate: transaction.interest_date,
        categoryName: category ? category.name : "No category",
        categoryColor: category ? category.color : "lightgray",
        accountName: account.name,
        accountNumber: account.account_number,
      };
    });
    setRichTransactions(richTransactions);
  }, [
    transactions,
    categories,
    accounts,
    transactionsLoading,
    categoriesLoading,
    accountsLoading,
  ]);

  return {
    transactions: richTransactions,
    loading: transactionsLoading || categoriesLoading || accountsLoading,
    setFromAndToDate,
  };
}

export default useRichTransactions;
