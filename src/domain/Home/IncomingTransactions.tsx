import { Spinner, Center, Divider, VStack } from "@chakra-ui/react";
import { Account } from "../../types";
import IncomingTransaction from "./IncomingTransaction";
import IncomingTransactionType from "../../types/IncomingTransaction";

interface Props {
  transactions: IncomingTransactionType[];
  accounts: Account[];
  loading: boolean;
}

function TransactionList({ transactions, accounts, loading }: Props) {
  const account = accounts.find((account) =>
    transactions
      .map((transaction) => transaction.accountId)
      .includes(account.id)
  ) as Account;
  return loading ? (
    <Center mt="8">
      <Spinner size="xl" />
    </Center>
  ) : (
    <VStack p="4" align="left">
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <Divider mb="2" />
          <IncomingTransaction transaction={transaction} account={account} />
        </div>
      ))}
    </VStack>
  );
}

export default TransactionList;
