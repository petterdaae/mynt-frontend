import { HStack, Checkbox, Divider, Select } from "@chakra-ui/react";
import TransactionList from "./TransactionList";
import { useTransactions } from "../../hooks/domain/useTransactions";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/date";

function TransactionListWithFilters() {
  const transactions = useTransactions();
  const [monthsBack, setMonthsBack] = useState(1);
  const [showCategorized, setShowCategorized] = useState(true);
  const today = formatDate(new Date());

  useEffect(() => {
    console.log("useEffect");
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - monthsBack);
    fromDate = formatDate(fromDate);
    transactions.setFromAndToDate(fromDate, today);
  }, [monthsBack, transactions.setFromAndToDate]);

  useEffect(() => {
    transactions.setType(showCategorized ? "all" : "uncategorized");
  }, [showCategorized, transactions.setType]);

  return (
    <>
      <HStack spacing="16px">
        <Select
          value={monthsBack}
          onChange={(e) => {
            console.log(e.target.value);
            setMonthsBack(e.target.value);
          }}
        >
          <option value={1}>Last 30 days</option>
          <option value={2}>Last 60 days</option>
          <option value={12}>Last year</option>
          <option value={1000}>All time</option>
        </Select>
        <Checkbox
          size="lg"
          isChecked={showCategorized}
          onChange={(e) => setShowCategorized((prev) => !prev)}
        >
          Categorized
        </Checkbox>
      </HStack>
      <Divider mt="8px" mb="8px" />
      <TransactionList />
    </>
  );
}

export default TransactionListWithFilters;
