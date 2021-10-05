import PropTypes from "prop-types";
import { useTransactions } from "../../hooks";
import List from "../../components/list";
import Transaction from "./transaction";

function TransactionList({ className }) {
  const { transactions } = useTransactions();
  return (
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
