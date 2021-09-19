import { useState, useEffect, useCallback } from "react";
import TransactionList from "../components/transactions/transaction_list";

function Home() {
  const formatDate = useCallback(
    (date) => date.toISOString().split("T")[0],
    []
  );

  const today = formatDate(new Date());
  let oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  oneMonthAgo = formatDate(oneMonthAgo);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/transactions?from_date=${oneMonthAgo}&to_date=${today}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) =>
        setTransactions(
          data.sort((a, b) => b.accounting_date > a.accounting_date)
        )
      );
  }, [setTransactions, oneMonthAgo, today]);

  if (transactions.length === 0) {
    return <></>;
  }

  return (
    <>
      <TransactionList data={transactions} />
    </>
  );
}

export default Home;
