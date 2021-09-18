import { useState, useEffect, useCallback } from "react";
import TransactionList from "../components/transaction_list";
import { DatePicker, Button } from "../components";
import styled from "styled-components";
import { base } from "../components/size";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${4 * base}px;
`;

const FromToDate = styled.div``;

const StyledP = styled.p`
  display: inline;
  margin: ${4 * base}px;
`;

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
      <Header>
        <Button>Lol</Button>
        <FromToDate>
          <StyledP>From</StyledP>
          <DatePicker value={fromDate} onChange={setFromDate} max={toDate} />
          <StyledP>To</StyledP>
          <DatePicker value={toDate} onChange={setToDate} max={today} />
        </FromToDate>
      </Header>
      <TransactionList data={transactions} />
    </>
  );
}

export default Home;
