import { useCallback } from "react";
import TransactionList from "./transaction_list";
import { TransactionsProvider, CategoriesProvider } from "../../hooks";

function Home() {
  const formatDate = useCallback(
    (date) => date.toISOString().split("T")[0],
    []
  );

  const today = formatDate(new Date());
  let oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  oneMonthAgo = formatDate(oneMonthAgo);

  return (
    <TransactionsProvider fromDate={oneMonthAgo} toDate={today}>
      <CategoriesProvider>
        <TransactionList />
      </CategoriesProvider>
    </TransactionsProvider>
  );
}

export default Home;
