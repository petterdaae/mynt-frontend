import PropTypes from "prop-types";
import { useTransactions } from "../../hooks";
import List from "../../components/list";
import Transaction from "./transaction";
import Loader from "../../components/loader";
import styled from "styled-components";

const StyledLoader = styled(Loader)`
  margin: auto;
  margin-top: 200px;
`;

function TransactionList({ className }) {
  const { transactions, loading } = useTransactions();
  return loading ? (
    <StyledLoader />
  ) : (
    transactions.length !== 0 && (
      <div className={className}>
        <List>
          {transactions.map((item) => (
            <Transaction key={item.id} transaction={item} />
          ))}
        </List>
      </div>
    )
  );
}

TransactionList.propTypes = {
  className: PropTypes.string,
};

export default TransactionList;
