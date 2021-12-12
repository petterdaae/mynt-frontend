import Transaction from "./Transaction";
import { useTransactions } from "../../hooks/domain/useTransactions";
import { Divider, Spinner, Center } from "@chakra-ui/react";

function TransactionList() {
  const { transactions, loading } = useTransactions();
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

export default TransactionList;
