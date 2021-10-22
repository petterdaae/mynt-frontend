import PropTypes from "prop-types";
import { useSpendings } from "../../hooks";
import { Button, Currency } from "../../components";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Buttons = styled.div`
  margin: auto;
  display: inline-block;
`;

const MonthDisplay = styled(Button)`
  width: 200px;
  background-color: white;
  border: none;
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
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 45px;
`;

function Summary({ currentCategory }) {
  const { spendings, loading, setToDate, setFromDate } = useSpendings();
  const [month, setMonth] = useState(getCurrentMonthIndex());
  const spending = spendings.find((s) => s.category_id === currentCategory);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setToAndFromDate(month, setToDate, setFromDate);
  }, [month]);

  return spending ? (
    <Wrapper>
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
      <Total value={spending.amount} />
    </Wrapper>
  ) : (
    <></>
  );
}

function setToAndFromDate(month, setToDate, setFromDate) {
  const formatDate = (date) =>
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate().toString().padStart(2, "0");
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(month / 12);
  const fromDate = new Date(year, month % 12, 1);
  const toDate = new Date(year, (month + 1) % 12, 0);
  setToDate(formatDate(toDate));
  setFromDate(formatDate(fromDate));
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
  currentCategory: PropTypes.string,
};

export default Summary;
