import { AccountCard } from "../components";
import { useState, useEffect } from "react";
import styled from "styled-components";
import TransactionList from "../components/transaction_list";
import { base, breakpoint } from "../components/size";

const StyledAccountCard = styled(AccountCard)`
  margin: ${2 * base}px;
  width: ${breakpoint / 3 - 4 * base}px;

  @media (max-width: ${breakpoint}px) {
    width: 100%;
  }
`;

const StyledTransactionList = styled(TransactionList)`
  margin: ${2 * base}px;
  width: ${breakpoint - 4 * base}px;
  @media (max-width: ${breakpoint}px) {
    width: auto;
  }
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
    const controller = new AbortController();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data));
    return () => controller?.abort();
  }, [setTransactions]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setAccounts(data));
    return () => controller?.abort();
  }, [setAccounts]);

  if (accounts.length === 0 || transactions.length === 0) {
    return <></>;
  }

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
