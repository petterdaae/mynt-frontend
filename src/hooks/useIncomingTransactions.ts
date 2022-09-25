import { useState, useEffect } from "react";
import IncomingTransaction from "../types/IncomingTransaction";

function useIncomingTransactions() {
  const [transactions, setTransactions] = useState<IncomingTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/incomingtransactions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      });
  }, [setLoading, setTransactions]);

  return {
    transactions,
    loading,
  };
}

export default useIncomingTransactions;
