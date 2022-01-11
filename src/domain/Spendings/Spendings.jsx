import { useState, useMemo } from "react";
import TransactionList from "../TransactionList/TransactionList";
import SpendingsList from "./SpendingsList";
import Summary from "./Summary";
import { Text, Divider, HStack, IconButton } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import { getDateFromMonth, getMonthName } from "./spendingsUtils";
import { useSpendings } from "../../hooks";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { mod } from "../utils";

function Spendings() {
  const [currentCategory, setCurrentCategory] = useState(null);
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

  return (
    <>
      <HStack justify="space-between" m="2">
        <IconButton
          onClick={() => setMonth((prev) => prev - 1)}
          disabled={loading}
          icon={<ArrowBackIcon />}
        />
        <Text>{getMonthName(mod(month, 12))}</Text>
        <IconButton
          onClick={() => setMonth((prev) => prev + 1)}
          disabled={loading}
          icon={<ArrowForwardIcon />}
        />
      </HStack>
      <Divider />
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
