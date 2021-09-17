import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/currency";
import { green, red } from "./color";
import List from "./list";
import ListItem from "./list_item";
import RandomIcon from "./random_icon";

const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

const DateTime = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  ${(props) => props.color && `color: ${props.color};`}
`;

function TransactionList({ data, className }) {
  return (
    <div className={className}>
      <List>
        {data.map((item) => (
          <StyledListItem key={item.id}>
            <RandomIcon />
            <DateTime>{item.accounting_date}</DateTime>
            <Text>{item.text}</Text>
            <Amount color={item.amount < 0 ? red : green}>
              {formatCurrency(item.amount)}
            </Amount>
          </StyledListItem>
        ))}
      </List>
    </div>
  );
}

TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default TransactionList;
