import { useTransactions, useCategorizations } from "./index";

function useTransactionsWithCategorizations(fromDate, toDate) {
  const { transactions, loading } = useTransactions(fromDate, toDate);
  const { categorizations, loading } = useCategorizations();
}

export default useTransactionsWithCategorizations;
