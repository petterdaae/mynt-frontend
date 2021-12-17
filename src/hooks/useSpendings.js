import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useCategories } from ".";
import useEffectSkipFirst from "./useEffectSkipFirst";

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

  const today = useMemo(() => formatDate(new Date()), []);
  const oneMonthAgo = useMemo(
    () => formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1))),
    []
  );

  const [spendings, setSpendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshState, setRefreshState] = useState(false);
  const { categories } = useCategories();
  const [fromAndToDate, setFromAndToDateState] = useState({
    from: oneMonthAgo,
    to: today,
  });

  useEffectSkipFirst(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/spendings?from_date=${fromAndToDate.from}&to_date=${fromAndToDate.to}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSpendings(data);
        setLoading(false);
      });
  }, [setSpendings, fromAndToDate, refreshState, setLoading, categories]);

  const refresh = useCallback(() => {
    setRefreshState((prev) => !prev);
  }, [setRefreshState]);

  const setFromAndToDate = useCallback(
    (from, to) => {
      setFromAndToDateState({ from, to });
    },
    [setFromAndToDateState]
  );

  return (
    <SpendingsContext.Provider
      value={{ spendings, loading, refresh, setFromAndToDate }}
      {...props}
    />
  );
}

export { SpendingsProvider, useSpendings };
