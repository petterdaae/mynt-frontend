import { Table, AccountCard } from "../components";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { base } from "../components/size";

const StyledAccountCard = styled(AccountCard)`
  margin-left: ${base}px;
  margin-bottom: ${base}px;
  display: inline-block;

  &:last-child {
    margin: 0;
  }
`;

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

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

  useEffect(async () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAccounts(data));
  }, [setAccounts]);

  return (
    <>
      <h1>Dashboard</h1>
      {accounts.map((account) => (
        <StyledAccountCard key={account.id} account={account} />
      ))}
      <Table
        headers={["Accounting Date", "Text", "Amount"]}
        data={transactions}
      />
    </>
  );
}

export default Dashboard;
