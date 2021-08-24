import PropTypes from "prop-types";
import styled from "styled-components";
import { base } from "./size";
import { weakFontColor, green, red } from "./color";
import { formatCurrency } from "../utils/currency";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: ${5 * base}px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  align-items: center;
`;

const NameAndAccountNumber = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: bold;
`;

const AccountNumber = styled.div`
  color: ${weakFontColor};
`;

const Amount = styled.div`
  flex: 1;
  text-align: right;
  font-size: ${5 * base}px;
  color: ${(props) => props.color};
`;

function AccountCard({ account, className }) {
  return (
    <Wrapper className={className}>
      <NameAndAccountNumber>
        <Name>{account.name}</Name>
        <AccountNumber>{account.account_number}</AccountNumber>
      </NameAndAccountNumber>
      <Amount color={account.available < 0 ? red : green}>
        {formatCurrency(account.available)}
      </Amount>
    </Wrapper>
  );
}

AccountCard.propTypes = {
  account: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default AccountCard;
