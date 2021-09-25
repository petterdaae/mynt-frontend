import styled from "styled-components";
import ListItem from "../list_item";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/currency";
import RandomIcon from "../random_icon";
import { green, red } from "../color";
import { useCallback, useState } from "react";
import Modal from "../modal";
import EditTransaction from "./edit_transaction";

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

function Transaction({ transaction }) {
  const [showModal, setShowModal] = useState(false);

  const formatDateTimeString = useCallback((datetime) => {
    const date = new Date(datetime);
    const month = date.toLocaleString("default", { month: "long" });
    return date.getDate() + ". " + month;
  }, []);

  return (
    <>
      <StyledListItem key={transaction.id} onClick={() => setShowModal(true)}>
        <RandomIcon />
        <DateTime>{formatDateTimeString(transaction.accounting_date)}</DateTime>
        <Text>{transaction.text}</Text>
        <Amount color={transaction.amount < 0 ? red : green}>
          {formatCurrency(transaction.amount)}
        </Amount>
      </StyledListItem>
      <Modal show={showModal}>
        <EditTransaction
          onCancel={() => setShowModal(false)}
          onSave={() => setShowModal(false)}
          transaction={transaction}
        />
      </Modal>
    </>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default Transaction;
