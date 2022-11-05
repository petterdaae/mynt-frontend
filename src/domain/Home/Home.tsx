import Accounts from "./Accounts";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Center,
  Checkbox,
  Divider,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useIncomingTransactions from "../../hooks/useIncomingTransactions";
import { useAccounts, useRichTransactions } from "../../hooks";
import IncomingTransactions from "./IncomingTransactions";
import { formatDate } from "../utils";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

const StyledAlert = styled(Alert)`
  cursor: pointer;
`;

function Home() {
  const history = useHistory();

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

  const { accounts, loading: accountsLoading, setFavorite } = useAccounts();

  const {
    transactions: incomingTransactions,
    loading: incomingTransactionsLoading,
  } = useIncomingTransactions();

  const { transactions, loading: transactionsLoading } = useRichTransactions(
    fromDate,
    toDate
  );

  const noUncategorizedTransactions = useMemo(
    () =>
      transactions.filter((transaction) => transaction.firstCategory === null)
        .length,
    [transactions]
  );

  const loading =
    accountsLoading || incomingTransactionsLoading || transactionsLoading;

  const [onlyShowFavoriteAccounts, setOnlyShowFavoriteAccounts] =
    useState(true);

  return loading ? (
    <Center mt="8">
      <Spinner size="xl" />
    </Center>
  ) : (
    <>
      <VStack align="left" p="4" pt="0">
        {noUncategorizedTransactions !== 0 ? (
          <StyledAlert
            status="warning"
            onClick={() => history.push("/authenticated/transactions")}
          >
            <AlertIcon />
            <AlertDescription>
              Du har {noUncategorizedTransactions} ukategoriserte transaksjoner
              den siste måneden
            </AlertDescription>
          </StyledAlert>
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
      <Checkbox
        isChecked={onlyShowFavoriteAccounts}
        onChange={() => setOnlyShowFavoriteAccounts((prev) => !prev)}
        ml="4"
        mt="4"
      >
        Only show favorite accounts
      </Checkbox>
      <Accounts
        accounts={accounts.filter((account) => account.favorite)}
        setFavorite={setFavorite}
        areFavorites={true}
      />
      {!onlyShowFavoriteAccounts && (
        <>
          <Divider />
          <Accounts
            accounts={accounts.filter((account) => !account.favorite)}
            setFavorite={setFavorite}
            areFavorites={false}
          />
        </>
      )}
      <Divider />
      <Text fontWeight="bold" fontSize="20px" m="4">
        Innkommende transaksjoner
      </Text>
      <Text ml="4" mr="4">
        Transaksjoner kan ikke behandles av mynt før de er bokført.
        Transaksjoner som ikke er bokført blir derfor liggende her i
        mellomtiden.
      </Text>
      <IncomingTransactions
        transactions={incomingTransactions}
        accounts={accounts}
      />
    </>
  );
}

export default Home;
