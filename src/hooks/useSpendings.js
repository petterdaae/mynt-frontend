import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const SpendingsContext = createContext();

function useSpendings() {
  const context = useContext(SpendingsContext);

  if (!context) {
    throw new Error("useSpendings must be used within a SpendingsContext");
  }

  return context;
}

function SpendingsProvider({ fromDate, toDate, ...props }) {
  const [spendings, setSpendings] = useState([]);

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

  return <SpendingsContext.Provider value={{ spendings }} {...props} />;
}

SpendingsProvider.propTypes = {
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
};

export { SpendingsProvider, useSpendings };
