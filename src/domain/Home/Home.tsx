import Accounts from "./Accounts";
import { Divider, Text } from "@chakra-ui/react";
import useIncomingTransactions from "../../hooks/useIncomingTransactions";
import { useAccounts } from "../../hooks";
import IncomingTransactions from "./IncomingTransactions";

function Home() {
  const { transactions, loading: transacstionsLoading } =
    useIncomingTransactions();
  const { accounts, loading: accountsLoading } = useAccounts();
  return (
    <>
      <Accounts />
      <Divider />
      <Text fontWeight="bold" fontSize="24px" m="4">
        Incoming transactions
      </Text>
      <IncomingTransactions
        transactions={transactions}
        accounts={accounts}
        loading={transacstionsLoading || accountsLoading}
      />
    </>
  );
}

export default Home;
