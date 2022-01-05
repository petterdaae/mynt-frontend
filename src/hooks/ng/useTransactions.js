import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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

function TransactionsProvider({ initialFromDate, initialToDate, ...props }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parameters, setParameters] = useState({
    fromDate: initialFromDate,
    toDate: initialToDate,
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/ng/transactions?from_date=${parameters.fromDate}&to_date=${parameters.toDate}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      });
  }, [setLoading, parameters, setTransactions]);

  const updateTransaction = useCallback(
    (transaction) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/ng/transactions`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(transaction),
      });
      setTransactions((prev) =>
        prev
          .map((t) => (t.id === transaction.id ? transaction : t))
          .filter(
            (t) =>
              (t.customDate ?? t.accountingDate) >= parameters.fromDate &&
              (t.customDate ?? t.accountingDate) <= parameters.toDate
          )
          .sort((a, b) => {
            const aDate = a.customDate ?? a.accountingDate;
            const bDate = b.customDate ?? b.accountingDate;
            return aDate > bDate ? -1 : aDate < bDate ? 1 : a.id - b.id;
          })
      );
    },
    [setTransactions, parameters]
  );

  return (
    <TransactionsContext.Provider
      value={{ transactions, loading, updateTransaction, setParameters }}
      {...props}
    />
  );
}

TransactionsProvider.propTypes = {
  initialFromDate: PropTypes.string,
  initialToDate: PropTypes.string,
};

export { TransactionsProvider, useTransactions };
