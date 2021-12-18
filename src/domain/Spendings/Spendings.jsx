import { useState, useMemo, useEffect } from "react";
import TransactionList from "../TransactionList/TransactionList";
import SpendingsList from "./SpendingsList";
import Summary from "./Summary";
import { Text, Divider, Button, HStack } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import { useSpendings } from "../../hooks/domain/useSpendings";
import {
  setFromAndToDate,
  getMonthName,
  getFromDateFromMonth,
  getToDateFromMonth,
} from "./spendingsUtils";

function Spendings() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const currentMonthIndex = useMemo(() => new Date().getMonth(), []);
  const [month, setMonth] = useState(currentMonthIndex);
  const { setFromAndToDate: setSpendingsFromAndToDate } = useSpendings();

  useEffect(() => {
    setFromAndToDate(month, setSpendingsFromAndToDate);
  }, [month, setMonth]);

  return (
    <>
      <HStack justify="space-between">
        <Button onClick={() => setMonth((prev) => prev - 1)}>
          Previous month
        </Button>
        <Text>{getMonthName(month % 12)}</Text>
        <Button onClick={() => setMonth((prev) => prev + 1)}>Next month</Button>
      </HStack>
      <CategoryBreadcrumb
        currentCategoryId={currentCategory}
        setCurrentCategoryId={setCurrentCategory}
      />
      <Divider mb="4" mt="4" />
      <Summary currentCategory={currentCategory} />
      <Text fontSize="2xl" mt="8">
        Spendings
      </Text>
      <Divider mb="2" mt="2" />
      <SpendingsList
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <Text fontSize="2xl" mt="8">
        Transactions
      </Text>
      <Divider mb="2" mt="2" />
      <TransactionList
        categoryId={currentCategory}
        fromDate={getFromDateFromMonth(month % 12)}
        toDate={getToDateFromMonth(month % 12)}
      />
    </>
  );
}

export default Spendings;
