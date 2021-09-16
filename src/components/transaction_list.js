import styled from "styled-components";
import PropTypes from "prop-types";
import { formatCurrency } from "../utils/currency";
import { green, red } from "./color";
import List from "./list";
import ListItem from "./list_item";

const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

const DateTime = styled.div``;
const Text = styled.div``;
const Amount = styled.div`
  ${(props) => props.color && `color: ${props.color};`}
`;

function TransactionList({ data, className }) {
  return (
    <div className={className}>
      <List>
        {data.map((item) => (
          <StyledListItem key={item.id}>
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
