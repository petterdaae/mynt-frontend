import { useState, useMemo, useEffect } from "react";
import TransactionList from "../TransactionList/TransactionList";
import SpendingsList from "./SpendingsList";
import Summary from "./Summary";
import { Text, Divider, Button, HStack } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import { getDateFromMonth, getMonthName } from "./spendingsUtils";
import { useSpendings } from "../../hooks";
import { mod } from "../utils";

function Spendings() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const currentMonthIndex = useMemo(() => new Date().getMonth(), []);
  const [month, setMonth] = useState(currentMonthIndex);

  const [fromDate, setFromDate] = useState(getDateFromMonth(month, 1));
  const [toDate, setToDate] = useState(getDateFromMonth(month + 1, 0));

  const {
    spendings,
    transactions,
    loading,
    categories,
    updateTransaction,
    updateCategorizationsForTransaction,
  } = useSpendings(fromDate, toDate);

  useEffect(() => {
    setFromDate(getDateFromMonth(month, 1));
    setToDate(getDateFromMonth(month + 1, 0));
  }, [month, setMonth]);

  return (
    <>
      <HStack justify="space-between">
        <Button onClick={() => setMonth((prev) => prev - 1)} disabled={loading}>
          Previous month
        </Button>
        <Text>{getMonthName(mod(month, 12))}</Text>
        <Button onClick={() => setMonth((prev) => prev + 1)} disabled={loading}>
          Next month
        </Button>
      </HStack>
      <CategoryBreadcrumb
        categories={categories}
        currentCategoryId={currentCategory}
        setCurrentCategoryId={setCurrentCategory}
      />
      <Divider mb="4" mt="4" />
      <Summary
        currentCategory={currentCategory}
        spendings={spendings}
        loading={loading}
      />
      <Text fontSize="2xl" mt="8">
        Spendings
      </Text>
      <Divider mb="2" mt="2" />
      <SpendingsList
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        spendings={spendings}
        categories={categories}
        loading={loading}
      />
      <Text fontSize="2xl" mt="8">
        Transactions
      </Text>
      <Divider mb="2" mt="2" />
      <TransactionList
        categoryId={currentCategory}
        showCategorized={true}
        transactions={transactions}
        loading={loading}
        updateCategorizationsForTransaction={
          updateCategorizationsForTransaction
        }
        updateTransaction={updateTransaction}
        categories={categories}
      />
    </>
  );
}

export default Spendings;
