import { Divider } from "@chakra-ui/react";
import TransactionList from "./TransactionList";
import Filters from "./Filters";
import { useRichTransactions } from "../../hooks";
import { useState, useMemo } from "react";
import { formatDate } from "../utils";

function TransactionListWithFilters() {
  const [showCategorized, setShowCategorized] = useState(true);
  const [monthsBack, setMonthsBack] = useState(1);

  const toDate = useMemo(() => {
    const future = new Date();
    future.setYear(3000);
    return formatDate(future);
  }, []);

  const fromDate = useMemo(() => {
    const past = new Date();
    past.setMonth(past.getMonth() - monthsBack);
    return formatDate(past);
  }, [monthsBack]);

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
        categories={categories}
        loading={loading}
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
