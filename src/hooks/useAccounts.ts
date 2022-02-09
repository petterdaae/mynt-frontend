import { useState, useEffect } from "react";
import { Account } from "../types";

function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((elements) => {
        setAccounts(elements);
        setLoading(false);
      });
  }, [setAccounts]);

  return { accounts, loading };
}

export default useAccounts;
