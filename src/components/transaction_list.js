import styled from "styled-components";
import { base } from "./size";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/currency";
import { green, red } from "./color";

const StyledTable = styled.table`
  border-spacing: 0;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding: ${6 * base}px; ;
`;

const StyledTr = styled.tr``;

const StyledTd = styled.td`
  padding-top: ${3 * base}px;
  padding-bottom: ${3 * base}px;
  padding-left: ${6 * base}px;
  padding-right: ${6 * base}px;

  border-top: 1px solid lightgray;
  ${(props) => props.color && `color: ${props.color};`}
  ${(props) => props.right && `text-align: right;`}
  ${(props) => props.bold && `font-weight: bold;`}
`;

const StyledTh = styled.th`
  padding-left: ${6 * base}px;
  padding-right: ${6 * base}px;
  padding-bottom: ${3 * base}px;
  padding-top: ${3 * base}px;
  ${(props) => props.right && `text-align: right;`}
`;

function TransactionList({ data, className }) {
  return (
    <StyledTable className={className}>
      <StyledTr>
        <StyledTh>Date</StyledTh>
        <StyledTh>Description</StyledTh>
        <StyledTh right>Amount</StyledTh>
      </StyledTr>
      {data.map((item) => (
        <StyledTr key={item.id}>
          <StyledTd>{item.accounting_date}</StyledTd>
          <StyledTd>{item.text}</StyledTd>
          <StyledTd color={item.amount < 0 ? red : green} right bold>
            {formatCurrency(item.amount)}
          </StyledTd>
        </StyledTr>
      ))}
    </StyledTable>
  );
}

TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default TransactionList;
