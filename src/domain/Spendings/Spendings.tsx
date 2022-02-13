import { useState, useMemo } from "react";
import TransactionList from "../TransactionList/TransactionList";
import SpendingsList from "./SpendingsList";
import Summary from "./Summary";
import {
  Text,
  Divider,
  HStack,
  IconButton,
  Center,
  Spinner,
} from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import { getDateFromMonth, getMonthName } from "./spendingsUtils";
import { useSpendings } from "../../hooks";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { mod } from "../utils";

function Spendings() {
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const currentMonthIndex = useMemo(() => new Date().getMonth(), []);
  const [month, setMonth] = useState(currentMonthIndex);
  const fromDate = useMemo(() => getDateFromMonth(month, 1), [month]);
  const toDate = useMemo(() => getDateFromMonth(month + 1, 0), [month]);

  const {
    spendings,
    transactions,
    loading,
    categories,
    updateTransaction,
    updateCategorizationsForTransaction,
  } = useSpendings(fromDate, toDate);

  const filteredTransactions = transactions.filter(
    (t) =>
      t.categorizations.some((c) => c.categoryId === currentCategory) ||
      (currentCategory === null && t.categorizations.length === 0)
  );

  return (
    <>
      <HStack justify="space-between" m="2">
        <IconButton
          aria-label="Previous month"
          onClick={() => setMonth((prev) => prev - 1)}
          disabled={loading}
          icon={<ArrowBackIcon />}
        />
        <Text>{getMonthName(mod(month, 12))}</Text>
        <IconButton
          aria-label="Next month"
          onClick={() => setMonth((prev) => prev + 1)}
          disabled={loading}
          icon={<ArrowForwardIcon />}
        />
      </HStack>
      <Divider />
      {loading ? (
        <Center mt="8">
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          <Summary currentCategory={currentCategory} spendings={spendings} />
          <Divider mb="2" mt="2" />
          <CategoryBreadcrumb
            categories={categories}
            currentCategoryId={currentCategory}
            setCurrentCategoryId={setCurrentCategory}
            loading={loading}
            m="2"
          />
          <Divider mb="2" mt="2" />

          <SpendingsList
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            spendings={spendings}
            categories={categories}
          />
          {filteredTransactions.length !== 0 && (
            <>
              <Text fontSize="2xl" m="2">
                Transactions
              </Text>
              <Divider mb="2" mt="2" />
              <TransactionList
                transactions={filteredTransactions}
                loading={loading}
                updateCategorizationsForTransaction={
                  updateCategorizationsForTransaction
                }
                updateTransaction={updateTransaction}
                categories={categories}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Spendings;
