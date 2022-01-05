import { Divider } from "@chakra-ui/react";
import TransactionList from "./TransactionList";
import Filters from "./Filters";
import { useTransactions } from "../../hooks";
import { useEffect, useState } from "react";
import { formatDate } from "../utils";

function TransactionListWithFilters() {
  const transactions = useTransactions();
  const [monthsBack, setMonthsBack] = useState(1);
  const [showCategorized, setShowCategorized] = useState(true);
  const future = new Date();
  future.setYear(3000);
  const toDate = formatDate(future);
  const [fromDate, setFromDate] = useState(toDate);

  useEffect(() => {
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - monthsBack);
    fromDate = formatDate(fromDate);
    setFromDate(fromDate);
    transactions.setFromAndToDate(fromDate, toDate);
  }, [monthsBack, setFromDate, transactions.setFromAndToDate]);

  useEffect(() => {
    transactions.setType(showCategorized ? "all" : "uncategorized");
  }, [showCategorized, transactions.setType]);

  return (
    <>
      <Filters
        monthsBack={monthsBack}
        setMonthsBack={setMonthsBack}
        showCategorized={showCategorized}
        setShowCategorized={setShowCategorized}
      />
      <Divider mt="8px" mb="8px" />
      <TransactionList fromDate={fromDate} toDate={toDate} />
    </>
  );
}

export default TransactionListWithFilters;
