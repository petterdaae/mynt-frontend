import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";

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

function TransactionsProvider({ fromDate, toDate, ...props }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  };

  return <TransactionsContext.Provider value={value} {...props} />;
}

TransactionsProvider.propTypes = {
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
};

export { TransactionsProvider, useTransactions };
