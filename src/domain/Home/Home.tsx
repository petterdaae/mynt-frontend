import Accounts from "./Accounts";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Divider,
  Text,
  VStack,
} from "@chakra-ui/react";
import useIncomingTransactions from "../../hooks/useIncomingTransactions";
import { useAccounts, useRichTransactions } from "../../hooks";
import IncomingTransactions from "./IncomingTransactions";
import { formatDate } from "../utils";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";

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

  const { transactions } = useRichTransactions(fromDate, toDate);
  const noUncategorizedTransactions = useMemo(
    () =>
      transactions.filter((transaction) => transaction.firstCategory === null)
        .length,
    [transactions]
  );

  const history = useHistory();

  return (
    <>
      <VStack align="left" p="4" pt="0">
        {noUncategorizedTransactions !== 0 ? (
          <Alert
            status="warning"
            onClick={() => history.push("/authenticated/transactions")}
          >
            <AlertIcon />
            <AlertDescription>
              Du har {noUncategorizedTransactions} ukategoriserte transaksjoner
              den siste måneden
            </AlertDescription>
          </Alert>
        ) : (
          <Alert status="success">
            <AlertIcon />
            <AlertDescription>
              Du har ingen ukategoriserte transaksjoner denne måneden
            </AlertDescription>
          </Alert>
        )}
      </VStack>
      <Divider />
      <Accounts />
      <Divider />
      <Text fontWeight="bold" fontSize="20px" m="4">
        Innkommende transaksjoner
      </Text>
      <Text ml="4" mr="4">
        Transaksjoner kan ikke behandles av mynt før de er bokført.
        Transaksjoner som ikke er bokført blir derfor liggende her til de er
        bokført.
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
