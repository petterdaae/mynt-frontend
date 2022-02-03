import { useCrud } from "./index";

function useAccounts() {
  const { elements, loading } = useCrud(
    `${process.env.REACT_APP_BACKEND_URL}/accounts`
  );

  return { accounts: elements, loading: loading };
}

export default useAccounts;
