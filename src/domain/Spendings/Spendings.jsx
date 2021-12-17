import { useState, useMemo, useEffect } from "react";
import TransactionList from "../TransactionList/TransactionList";
import SpendingsList from "./SpendingsList";
import Summary from "./Summary";
import { Text, Divider, Button, HStack } from "@chakra-ui/react";
import CategoryBreadcrumb from "../CategoryBreadcrumb/CategoryBreadcrumb";
import { useSpendings } from "../../hooks";
import { setSpendingsFromAndToDate, getMonthName } from "./spendingsUtils";

function Spendings() {
  const [currentCategory, setCurrentCategory] = useState(null);
  const currentMonthIndex = useMemo(() => new Date().getMonth(), []);
  const [month, setMonth] = useState(currentMonthIndex);
  const { setFromAndToDate } = useSpendings();

  useEffect(() => {
    setSpendingsFromAndToDate(month, setFromAndToDate);
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
      <Divider mb="2" mt="2" />
      <CategoryBreadcrumb
        currentCategoryId={currentCategory}
        setCurrentCategoryId={setCurrentCategory}
      />
      <Divider mb="2" mt="2" />
      <Summary currentCategory={currentCategory} />
      <Text fontSize="2xl">Spendings</Text>
      <Divider mb="2" mt="2" />
      <SpendingsList
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <Text fontSize="2xl">Transactions</Text>
      <Divider mb="2" mt="2" />
      <TransactionList categoryId={currentCategory} />
    </>
  );
}

export default Spendings;
