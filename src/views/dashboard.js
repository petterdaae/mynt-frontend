import { Table } from "../components";
import { useState, useEffect } from "react";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(async () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>
        setTransactions(
          data.map((transaction) => ({
            accounting_date: transaction.accounting_date,
            text: transaction.text,
            amount: transaction.amount,
          }))
        )
      );
  }, [setTransactions]);

  return (
    <>
      <h1>Dashboard</h1>
      <Table
        headers={["Accounting Date", "Text", "Amount"]}
        data={transactions}
      />
    </>
  );
}

export default Dashboard;
