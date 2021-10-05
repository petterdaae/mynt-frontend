import { useCallback } from "react";
import { SpendingsProvider, CategoriesProvider } from "../../hooks";
import SpendingsList from "./spendings_list";

function Spendings() {
  const formatDate = useCallback(
    (date) => date.toISOString().split("T")[0],
    []
  );

  const today = formatDate(new Date());
  let oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  oneMonthAgo = formatDate(oneMonthAgo);

  return (
    <CategoriesProvider>
      <SpendingsProvider fromDate={oneMonthAgo} toDate={today}>
        <SpendingsList />
      </SpendingsProvider>
    </CategoriesProvider>
  );
}

export default Spendings;
