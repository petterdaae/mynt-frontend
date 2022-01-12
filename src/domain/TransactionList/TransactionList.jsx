import Transaction from "./Transaction";
import { Divider, Spinner, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";

function TransactionList({
  showCategorized,
  transactions,
  loading,
  updateCategorizationsForTransaction,
  updateTransaction,
  categories,
}) {
  if (!showCategorized) {
    transactions = transactions.filter((t) => !t.category);
  }

  return loading ? (
    <Center mt="8">
      <Spinner size="xl" />
    </Center>
  ) : (
    transactions.map((transaction) => (
      <div key={transaction.id}>
        <Transaction
          transaction={transaction}
          updateCategorizationsForTransaction={
            updateCategorizationsForTransaction
          }
          updateTransaction={updateTransaction}
          categories={categories}
          loading={loading}
        />
        <Divider />
      </div>
    ))
  );
}

TransactionList.propTypes = {
  showCategorized: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  updateCategorizationsForTransaction: PropTypes.func.isRequired,
  updateTransaction: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default TransactionList;
