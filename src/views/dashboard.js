import { AccountCard } from "../components";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../components/transaction_list";
import { base } from "../components/size";

const StyledAccountCard = styled(AccountCard)`
  margin: ${2 * base}px;
  width: ${1400 / 3 - 2 * 8}px;
`;

const StyledTable = styled(Table)`
  margin: ${2 * base}px;
  width: ${1400 - 4 * base}px;
`;

const AccountsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
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
      <AccountsWrapper>
        {accounts.map((account) => (
          <StyledAccountCard key={account.id} account={account} />
        ))}
      </AccountsWrapper>
      <StyledTable
        headers={["Accounting Date", "Text", "Amount"]}
        data={transactions}
      />
    </>
  );
}

export default Dashboard;
