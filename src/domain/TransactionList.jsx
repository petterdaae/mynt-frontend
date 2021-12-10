import Transaction from "./Transaction";
import { useTransactions } from "../hooks/domain/useTransactions";
import { useEffect } from "react";
import { formatDate, formatReadableDate } from "../utils/date";
import { Divider } from "@chakra-ui/layout";

function TransactionList() {
  const { transactions, setFromAndToDate, loading } = useTransactions();
  const today = formatDate(new Date());

  console.log(transactions);

  useEffect(() => {
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    fromDate = formatDate(fromDate);
    setFromAndToDate(fromDate, today);
  }, []);

  return (
    !loading &&
    transactions.map((transaction) => (
      <>
        <Transaction
          key={transaction.id}
          transaction={{
            text: transaction.text,
            account: "Kort",
            date: formatReadableDate(transaction.accounting_date),
            category_color: "lightblue",
            amount: transaction.amount,
          }}
        />
        <Divider />
      </>
    ))
  );
}

export default TransactionList;
