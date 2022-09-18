import Transaction from "./Transaction";
import { Divider, Spinner, Center } from "@chakra-ui/react";
import { RichTransaction, Category } from "../../types";
import useSuggestions from "../../hooks/useSuggestions";

interface Props {
  transactions: RichTransaction[];
  loading: boolean;
  updateCategorizationsForTransaction: any;
  updateTransaction: any;
  categories: Category[];
}

function TransactionList({
  transactions,
  loading,
  updateCategorizationsForTransaction,
  updateTransaction,
  categories,
}: Props) {
  const suggest = useSuggestions(transactions);
  return loading ? (
    <Center mt="8">
      <Spinner size="xl" />
    </Center>
  ) : (
    <>
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <Transaction
            transaction={transaction}
            updateCategorizationsForTransaction={
              updateCategorizationsForTransaction
            }
            updateTransaction={updateTransaction}
            categories={categories}
            loading={loading}
            suggest={suggest}
          />
          <Divider />
        </div>
      ))}
    </>
  );
}

export default TransactionList;
