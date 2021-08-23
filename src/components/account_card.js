import PropTypes from "prop-types";
import styled from "styled-components";
import { base } from "./size";
import { formatCurrency } from "../utils/currency";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${5 * base}px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const NameAndAmount = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-bottom: ${2 * base}px;
`;

const AccountNumber = styled.div`
  text-align: right;
  font-style: italic;
  padding-top: ${2 * base}px;
`;

function AccountCard({ account, className }) {
  return (
    <Wrapper className={className}>
      <NameAndAmount>
        <div>{account.name}</div>
        <div>{formatCurrency(account.available)}</div>
      </NameAndAmount>
      <AccountNumber>{account.account_number}</AccountNumber>
    </Wrapper>
  );
}

AccountCard.propTypes = {
  account: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default AccountCard;
