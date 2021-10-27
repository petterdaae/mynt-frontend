import { createContext, useContext, useState, useCallback } from "react";
import useEffectSkipFirst from "./useEffectSkipFirst";

const TransactionsContext = createContext();

function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }

  return context;
}

function TransactionsProvider(props) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffectSkipFirst(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/transactions?from_date=${fromDate}&to_date=${toDate}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      });
  }, [setTransactions, fromDate, toDate]);

  const setFromAndToDate = useCallback(
    (from, to) => {
      setFromDate(from);
      setToDate(to);
    },
    [setFromDate, setToDate]
  );

  const updateTransactionCategory = useCallback(
    (transaction, categoryId) => {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/transactions/update_category`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({
            transaction_id: transaction.id,
            categorizations: [
              {
                category_id: categoryId,
                amount: transaction.amount,
              },
            ],
          }),
        }
      );

      setTransactions((prev) => {
        const slice = prev.slice();
        const index = slice.findIndex((t) => t.id === transaction.id);
        slice[index].category_id = categoryId;
        return slice;
      });
    },
    [transactions, setTransactions]
  );

  const value = {
    transactions,
    setTransactions,
    updateTransactionCategory,
    loading,
    setFromAndToDate,
  };

  return <TransactionsContext.Provider value={value} {...props} />;
}

export { TransactionsProvider, useTransactions };
