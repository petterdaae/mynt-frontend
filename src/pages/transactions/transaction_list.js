import PropTypes from "prop-types";
import { useTransactions } from "../../hooks";
import List from "../../components/list";
import ListItem from "../../components/list_item";
import Transaction from "./transaction";
import Loader from "../../components/loader";
import styled from "styled-components";
import { formatDate } from "../../utils/date";
import { useEffect, useState } from "react";

const StyledLoader = styled(Loader)`
  margin: auto;
  margin-top: 200px;
`;

function TransactionList({ className }) {
  const { transactions, loading, setFromAndToDate } = useTransactions();
  const today = formatDate(new Date());
  const [monthsBack, setMonthsBack] = useState(0);

  useEffect(() => {
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - monthsBack);
    fromDate = formatDate(fromDate);
    setFromAndToDate(fromDate, today);
  }, [monthsBack]);

  return loading && transactions.length === 0 ? (
    <StyledLoader />
  ) : (
    <div className={className}>
      <List>
        {transactions.length !== 0 &&
          transactions.map((item) => (
            <Transaction key={item.id} transaction={item} />
          ))}
        <ListItem key={-1} onClick={() => setMonthsBack((prev) => prev + 1)}>
          Load more transactions
        </ListItem>
      </List>
    </div>
  );
}

TransactionList.propTypes = {
  className: PropTypes.string,
};

export default TransactionList;
