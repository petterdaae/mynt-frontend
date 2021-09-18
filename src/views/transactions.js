import { useState, useEffect, useCallback } from "react";
import TransactionList from "../components/transaction_list";
import { DatePicker } from "../components";

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
  const [toDate, setToDate] = useState(today);
  const [fromDate, setFromDate] = useState(oneMonthAgo);

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

  return (
    <>
      <DatePicker value={fromDate} onChange={setFromDate} max={toDate} />
      <DatePicker value={toDate} onChange={setToDate} max={today} />
      <TransactionList data={transactions} />
    </>
  );
}

export default Home;
