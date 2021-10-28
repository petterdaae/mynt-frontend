import PropTypes from "prop-types";
import { useTransactions } from "../../hooks";
import List from "../../components/list";
import Transaction from "./transaction";
import Loader from "../../components/loader";
import styled from "styled-components";
import { formatDate } from "../../utils/date";
import { useEffect, useState } from "react";
import Select from "../../components/select";

const StyledLoader = styled(Loader)`
  margin: auto;
  margin-top: 200px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

const timeOptions = [
  { label: "Last 30 days", value: 1, key: 1 },
  { label: "Last 60 days", value: 2, key: 2 },
  { label: "Last year", value: 12, key: 3 },
  { label: "All time", value: 1000, key: 4 },
];

const typeOptions = [
  { label: "All", value: "all", key: 1 },
  { label: "Uncategorized", value: "income", key: 2 },
  { label: "Expense", value: "expense", key: 3 },
];

function TransactionList({ className }) {
  const { transactions, loading, setFromAndToDate } = useTransactions();
  const today = formatDate(new Date());
  const [monthsBack, setMonthsBack] = useState(1);
  const [type, setType] = useState(typeOptions[0]);

  useEffect(() => {
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - monthsBack);
    fromDate = formatDate(fromDate);
    setFromAndToDate(fromDate, today);
  }, [monthsBack]);

  return (
    <>
      <Filters>
        <StyledSelect
          selected={timeOptions.find((option) => option.value === monthsBack)}
          options={timeOptions}
          onChange={(option) => setMonthsBack(option.value)}
        />
        <StyledSelect
          selected={type}
          options={typeOptions}
          onChange={(option) => setType(option)}
        />
      </Filters>
      {loading ? (
        <StyledLoader />
      ) : (
        <div className={className}>
          <List>
            {transactions.length !== 0 &&
              transactions.map((item) => (
                <Transaction key={item.id} transaction={item} />
              ))}
          </List>
        </div>
      )}
    </>
  );
}

TransactionList.propTypes = {
  className: PropTypes.string,
};

export default TransactionList;
