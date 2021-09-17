import { useState, useEffect } from "react";
import TransactionList from "../components/transaction_list";

function Home() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        setTransactions(
          data.sort((a, b) => b.accounting_date > a.accounting_date)
        )
      );
  }, [setTransactions]);

  if (transactions.length === 0) {
    return <></>;
  }

  return <TransactionList data={transactions} />;
}

export default Home;
