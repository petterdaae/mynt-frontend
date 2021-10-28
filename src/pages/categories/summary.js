import PropTypes from "prop-types";
import { useSpendings } from "../../hooks";
import { Button, Currency } from "../../components";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { formatDate } from "../../utils/date";
import { green, red } from "../../components/color";

const Buttons = styled.div`
  display: inline-block;
`;

const MonthDisplay = styled(Button)`
  width: 200px;
  background-color: white;
  border: none;
  margin-bottom: 16px;
  &:hover {
    cursor: inherit;
    border: none;
  }
  &:focus {
    background-color: white;
  }
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Total = styled(Currency)`
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 40px;
  flex: 1;
  ${(props) => (props.color ? `color: ${props.color}` : "")}
`;

const TotalsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

function Summary({ currentCategory }) {
  console.log("render");
  const { spendings, loading, setFromAndToDate } = useSpendings();
  const currentMonthIndex = useMemo(() => getCurrentMonthIndex(), []);
  const [month, setMonth] = useState(currentMonthIndex);
  const spending = spendings.find((s) => s.category_id === currentCategory);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    setToAndFromDate(month, setFromAndToDate);
  }, [month]);

  return spending ? (
    <Wrapper>
      <TotalsWrapper>
        <Total value={spending.negative_amount} color={red} />
        <Total value={spending.amount} color="lightblue" />
        <Total value={spending.positive_amount} color={green} />
      </TotalsWrapper>
      <Buttons>
        <Button
          disabled={loading}
          onClick={() => {
            setMonth((prev) => prev - 1);
          }}
        >
          Previous
        </Button>
        <MonthDisplay>
          {getMonthName(Math.abs(month % 12)) +
            " " +
            (currentYear + Math.floor(month / 12))}
        </MonthDisplay>
        <Button
          disabled={loading}
          onClick={() => {
            setMonth((prevMonth) => prevMonth + 1);
          }}
        >
          Next
        </Button>
      </Buttons>
    </Wrapper>
  ) : (
    <></>
  );
}

function setToAndFromDate(month, setFromAndToDate) {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(month / 12);
  const fromDate = new Date(year, month % 12, 1);
  const toDate = new Date(year, (month + 1) % 12, 0);
  setFromAndToDate(formatDate(fromDate), formatDate(toDate));
}

function getCurrentMonthIndex() {
  return new Date().getMonth();
}

function getMonthName(monthIndex) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex];
}

Summary.propTypes = {
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Summary;
