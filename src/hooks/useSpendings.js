import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const SpendingsContext = createContext();

function useSpendings() {
  const context = useContext(SpendingsContext);

  if (!context) {
    throw new Error("useSpendings must be used within a SpendingsContext");
  }

  return context;
}

function SpendingsProvider(props) {
  const formatDate = useCallback(
    (date) => date.toISOString().split("T")[0],
    []
  );

  const today = formatDate(new Date());
  let oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  oneMonthAgo = formatDate(oneMonthAgo);

  const [spendings, setSpendings] = useState([]);
  const [fromDate, setFromDate] = useState(oneMonthAgo);
  const [toDate, setToDate] = useState(today);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/spendings?from_date=${fromDate}&to_date=${toDate}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSpendings(data);
      });
  }, [setSpendings, fromDate, toDate]);

  return (
    <SpendingsContext.Provider
      value={{ spendings, setFromDate, setToDate }}
      {...props}
    />
  );
}

export { SpendingsProvider, useSpendings };
