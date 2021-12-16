import Transaction from "./Transaction";
import { useTransactions } from "../../hooks/domain/useTransactions";
import { Divider, Spinner, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";

function TransactionList({ categoryId }) {
  let { transactions, loading } = useTransactions();
  transactions =
    categoryId !== undefined
      ? transactions.filter(
          (t) => t.category_id !== null && t.category_id === categoryId
        )
      : transactions;
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
};

export default TransactionList;
