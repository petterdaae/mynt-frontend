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
        (category) => category.id === transaction.categoryId
      );
      const account = accounts.find(
        (account) => account.id === transaction.accountId
      );
      return {
        id: transaction.id,
        text: transaction.text,
        amount: transaction.amount,
        accountingDate: transaction.accounting_date,
        interestDate: transaction.interest_date,
        categoryName: category.name,
        categoryColor: category.color,
        accountName: account.name,
        accountNumber: account.number,
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
