import { createContext, useContext } from "react";
import useChanged from "./useChanged";

const InvalidationContext = createContext();

function useInvalidation() {
  const context = useContext(InvalidationContext);

  if (!context) {
    throw new Error(
      "useInvalidation must be used within an InvalidationProvider"
    );
  }

  return context;
}

function InvalidationProvider(props) {
  const [transactionsChanged, invalidateTransactions] = useChanged();
  const [categorizationsChanged, invalidateCategorizations] = useChanged();
  const [categoriesChanged, invalidateCategories] = useChanged();
  return (
    <InvalidationContext.Provider
      value={{
        transactionsChanged,
        invalidateTransactions,
        categorizationsChanged,
        invalidateCategorizations,
        categoriesChanged,
        invalidateCategories,
      }}
      {...props}
    />
  );
}

export { InvalidationProvider, useInvalidation };
