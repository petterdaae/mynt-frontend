import { useCallback, useMemo } from "react";
import { RichTransaction, Suggestion } from "../types";

function useSuggestions(richTransactions: RichTransaction[]) {
  const suggestions: Suggestion[] = useMemo(() => {
    const suggestions = [];
    for (const transaction of richTransactions) {
      if (transaction.categorizations.length === 1) {
        const pattern = transaction.text.replace(/[0-9]/g, "");
        const category = transaction.firstCategory;
        suggestions.push({
          pattern,
          category,
        });
      }
    }
    return suggestions;
  }, [richTransactions]);

  const suggest = useCallback(
    (transaction: RichTransaction) => {
      const transactionPattern = transaction.text.replace(/[0-9]/g, "");
      for (const suggestion of suggestions) {
        if (transactionPattern === suggestion.pattern) {
          console.log(suggestion);
          return suggestion.category;
        }
      }
      return null;
    },
    [suggestions]
  );

  return suggest;
}

export default useSuggestions;
