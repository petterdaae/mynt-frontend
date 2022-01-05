import Transaction from "./Transaction";
import { Divider, Spinner, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";

function TransactionList({
  categoryId,
  showCategorized,
  transactions,
  loading,
}) {
  if (categoryId !== undefined) {
    transactions = transactions.filter((t) => t.category.id === categoryId);
  }

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
        <Transaction transaction={transaction} />
        <Divider />
      </div>
    ))
  );
}

TransactionList.propTypes = {
  categoryId: PropTypes.number,
  showCategorized: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TransactionList;
