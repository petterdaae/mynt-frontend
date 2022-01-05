import Transaction from "./Transaction";
import { useTransactions } from "../../hooks";
import { Divider, Spinner, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect } from "react";

function TransactionList({ categoryId, fromDate, toDate }) {
  let { transactions, loading, setFromAndToDate } = useTransactions();

  useEffect(() => {
    setFromAndToDate(fromDate, toDate);
  }, [fromDate, toDate, setFromAndToDate]);

  transactions =
    categoryId !== undefined
      ? transactions.filter((t) => t.category_id === categoryId)
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
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
};

export default TransactionList;
