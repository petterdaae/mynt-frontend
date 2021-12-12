import { createContext, useContext, useState, useEffect } from "react";

const AccountsContext = createContext();

function useAccounts() {
  const context = useContext(AccountsContext);

  if (!context) {
    throw new Error("useAccounts must be used within a AccountsProvider");
  }

  return context;
}

function AccountsProvider(props) {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/accounts`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data);
        setLoading(false);
      });
  }, [setAccounts, setLoading]);

  return <AccountsContext.Provider value={{ accounts, loading }} {...props} />;
}

export { AccountsProvider, useAccounts };
