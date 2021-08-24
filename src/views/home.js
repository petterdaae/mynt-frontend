import { AccountCard } from "../components";
import { useState, useEffect } from "react";
import styled from "styled-components";
import TransactionList from "../components/transaction_list";
import { base, breakpoint } from "../components/size";

const StyledAccountCard = styled(AccountCard)`
  margin: ${2 * base}px;
  width: ${breakpoint / 3 - 4 * base}px;
`;

const StyledTransactionList = styled(TransactionList)`
  margin: ${2 * base}px;
  width: ${breakpoint - 4 * base}px;
`;

const AccountsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [setTransactions]);

  useEffect(() => {
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
      <StyledTransactionList data={transactions} />
    </>
  );
}

export default Home;
