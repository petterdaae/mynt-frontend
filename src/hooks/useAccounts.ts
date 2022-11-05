import { useState, useEffect, useCallback } from "react";
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

  const setFavorite = useCallback(
    (id: string, favorite: boolean) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          id,
          favorite,
        }),
      });
      setAccounts((prev) =>
        prev.map((account) =>
          account.id === id ? { ...account, favorite: favorite } : account
        )
      );
    },
    [setAccounts]
  );

  return { accounts, loading, setFavorite };
}

export default useAccounts;
