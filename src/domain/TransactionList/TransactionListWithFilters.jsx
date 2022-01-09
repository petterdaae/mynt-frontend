import { Divider } from "@chakra-ui/react";
import TransactionList from "./TransactionList";
import Filters from "./Filters";
import { useRichTransactions } from "../../hooks";
import { useEffect, useState } from "react";
import { formatDate } from "../utils";

function TransactionListWithFilters() {
  const [showCategorized, setShowCategorized] = useState(true);
  const [monthsBack, setMonthsBack] = useState(1);

  const future = new Date();
  future.setYear(3000);
  const toDate = formatDate(future);
  const [fromDate, setFromDate] = useState(toDate);

  useEffect(() => {
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - monthsBack);
    fromDate = formatDate(fromDate);
    setFromDate(fromDate);
  }, [monthsBack, setFromDate]);

  const {
    transactions,
    loading,
    update,
    updateCategorizationsForTransaction,
    categories,
  } = useRichTransactions(fromDate, toDate);

  return (
    <>
      <Filters
        monthsBack={monthsBack}
        setMonthsBack={setMonthsBack}
        showCategorized={showCategorized}
        setShowCategorized={setShowCategorized}
      />
      <Divider mt="8px" mb="8px" />
      <TransactionList
        showCategorized
        transactions={transactions}
        loading={loading}
        updateTransaction={update}
        updateCategorizationsForTransaction={
          updateCategorizationsForTransaction
        }
        categories={categories}
      />
    </>
  );
}

export default TransactionListWithFilters;
