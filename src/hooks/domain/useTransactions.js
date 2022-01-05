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

function TransactionsProvider({ initialFromDate, initialToDate }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [_fromAndToDate, _setFromAndToDate] = useState({
    from: initialFromDate,
    to: initialToDate,
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/ng/transactions?from_date=${_fromAndToDate.from}&to_date=${_fromAndToDate.to}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      });
  }, [setLoading, _fromAndToDate, setTransactions]);

  const setFromAndToDate = useCallback(
    (from, to) => {
      _setFromAndToDate({ from, to });
    },
    [_setFromAndToDate]
  );

  const update = useCallback((transaction) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/ng/transactions/update_category`,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(transaction),
      }
    );

    setTransactions((prev) =>
      prev
        .map((t) => (t.id === transaction.id ? transaction : t))
        .filter(
          (t) =>
            (t.customDate ?? t.accountingDate) >= _fromAndToDate.from &&
            (t.customDate ?? t.accountingDate) <= _fromAndToDate.to
        )
        .sort((a, b) => {
          const aDate = a.customDate ?? a.accountingDate;
          const bDate = b.customDate ?? b.accountingDate;
          return aDate === bDate ? a.id - b.id : aDate >= bDate ? -1 : 1;
        })
    );
  });

  const value = {
    transactions,
    loading,
    update,
    setFromAndToDate,
  };

  return <TransactionsContext.Provider value={value} />;
}

TransactionsProvider.propTypes = {
  initialFromDate: PropTypes.string,
  initialToDate: PropTypes.string,
};

export { TransactionsProvider, useTransactions };
