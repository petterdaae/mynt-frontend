import styled from "styled-components";
import { base, breakpoint } from "./size";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/currency";
import { green, red, weakFontColor } from "./color";

const Wrapper = styled.div``;

const StyledTable = styled.table`
  border-spacing: 0;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding: ${6 * base}px;
  width: 100%;

  @media (max-width: ${breakpoint}px) {
    display: none;
  }
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

const MobileTransactionList = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding: ${6 * base}px;

  @media (min-width: ${breakpoint}px) {
    display: none;
  }
`;

const MobileTransactionListItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding-bottom: ${3 * base}px;
  padding-top: ${3 * base}px;
`;

const MobileDescriptionAndAccountingDate = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const MobileAccountingDate = styled.div`
  color: ${weakFontColor};
`;

const MobileDescription = styled.div``;

const MobileAmount = styled.div`
  text-align: right;
  flex: 1;
  color: ${(props) => props.color};
  font-weight: bold;
`;

function TransactionList({ data, className }) {
  return (
    <Wrapper className={className}>
      <StyledTable>
        <tbody>
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
        </tbody>
      </StyledTable>
      <MobileTransactionList>
        {data.map((item) => (
          <MobileTransactionListItem key={item.id}>
            <MobileDescriptionAndAccountingDate>
              <MobileDescription>{item.text}</MobileDescription>
              <MobileAccountingDate>
                {item.accounting_date}
              </MobileAccountingDate>
            </MobileDescriptionAndAccountingDate>
            <MobileAmount color={item.amount < 0 ? red : green}>
              {formatCurrency(item.amount)}
            </MobileAmount>
          </MobileTransactionListItem>
        ))}
      </MobileTransactionList>
    </Wrapper>
  );
}

TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default TransactionList;
