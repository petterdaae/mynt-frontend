import Transaction from "./Transaction";
import { useTransactions } from "../../hooks/domain/useTransactions";
import { useEffect } from "react";
import { formatDate } from "../../utils/date";
import { Divider } from "@chakra-ui/layout";

function TransactionList() {
  const { transactions, setFromAndToDate, loading } = useTransactions();
  const today = formatDate(new Date());

  useEffect(() => {
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    fromDate = formatDate(fromDate);
    setFromAndToDate(fromDate, today);
  }, []);

  return (
    !loading &&
    transactions.map((transaction) => (
      <div key={transaction.id}>
        <Transaction transaction={transaction} />
        <Divider />
      </div>
    ))
  );
}

export default TransactionList;
