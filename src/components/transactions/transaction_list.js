import PropTypes from "prop-types";
import List from "../list";
import Transaction from "./transaction";

function TransactionList({ data, setTransactions, className }) {
  return (
    <div className={className}>
      <List>
        {data.map((item) => (
          <Transaction
            key={item.id}
            transaction={item}
            setTransactions={setTransactions}
          />
        ))}
      </List>
    </div>
  );
}

TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  setTransactions: PropTypes.func.isRequired,
};

export default TransactionList;
