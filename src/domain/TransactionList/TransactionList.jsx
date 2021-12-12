import Transaction from "./Transaction";
import { useTransactions } from "../../hooks/domain/useTransactions";
import { Divider } from "@chakra-ui/layout";

function TransactionList() {
  const { transactions, loading } = useTransactions();
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
