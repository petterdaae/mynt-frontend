import Accounts from "./Accounts";
import { Divider, Text } from "@chakra-ui/react";
import useIncomingTransactions from "../../hooks/useIncomingTransactions";
import { useAccounts, useRichTransactions } from "../../hooks";
import IncomingTransactions from "./IncomingTransactions";
import { formatDate } from "../utils";
import { useMemo } from "react";
import TransactionList from "../TransactionList/TransactionList";

function Home() {
  const toDate = useMemo(() => {
    const future = new Date();
    future.setFullYear(3000);
    return formatDate(future);
  }, []);

  const fromDate = useMemo(() => {
    const past = new Date();
    past.setMonth(past.getMonth() - 1);
    return formatDate(past);
  }, []);

  const { accounts, loading: accountsLoading } = useAccounts();

  const { transactions: incomingTransactions, loading: transacstionsLoading } =
    useIncomingTransactions();

  const {
    transactions,
    loading,
    update,
    updateCategorizationsForTransaction,
    categories,
  } = useRichTransactions(fromDate, toDate);

  const uncategorizedTransactions = useMemo(
    () =>
      transactions.filter((transaction) => transaction.firstCategory === null),
    [transactions]
  );

  return (
    <>
      <Accounts />
      <Divider />
      <Text fontWeight="bold" fontSize="20px" m="4">
        Uncategorized (this month)
      </Text>
      <TransactionList
        transactions={uncategorizedTransactions}
        loading={loading}
        updateTransaction={update}
        updateCategorizationsForTransaction={
          updateCategorizationsForTransaction
        }
        categories={categories}
      />
      <Divider />
      <Text fontWeight="bold" fontSize="20px" m="4">
        Incoming transactions
      </Text>
      <IncomingTransactions
        transactions={incomingTransactions}
        accounts={accounts}
        loading={transacstionsLoading || accountsLoading}
      />
    </>
  );
}

export default Home;
