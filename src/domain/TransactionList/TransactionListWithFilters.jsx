import { Divider } from "@chakra-ui/react";
import TransactionList from "./TransactionList";
import Filters from "./Filters";
import { useTransactions } from "../../hooks/domain/useTransactions";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/date";

function TransactionListWithFilters() {
  const transactions = useTransactions();
  const [monthsBack, setMonthsBack] = useState(1);
  const [showCategorized, setShowCategorized] = useState(true);
  const today = formatDate(new Date());

  useEffect(() => {
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
      <Filters
        monthsBack={monthsBack}
        setMonthsBack={setMonthsBack}
        showCategorized={showCategorized}
        setShowCategorized={setShowCategorized}
      />
      <Divider mt="8px" mb="8px" />
      <TransactionList />
    </>
  );
}

export default TransactionListWithFilters;
