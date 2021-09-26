import PropTypes from "prop-types";
import { Select, Button } from "..";
import { base } from "../size";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { useCategories } from "../../hooks";

const StyledButton = styled(Button)`
  margin-right: ${4 * base}px;
`;

const StyledSelect = styled(Select)`
  margin-bottom: ${4 * base}px;
`;

const Wrapper = styled.div``;

const Buttons = styled.div`
  display: flex;
`;

function EditTransaction({ onSave, onCancel, transaction, setTransactions }) {
  const categories = useCategories();
  const [category, setCategory] = useState(transaction.category_id || 0);
  console.log(category);

  const updateCategory = useCallback(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions/update_category`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        transaction_id: transaction.id,
        categorizations: [
          {
            category_id: parseInt(category, 10),
            amount: transaction.amount,
          },
        ],
      }),
    });
  }, [category]);

  return (
    <Wrapper>
      <h3>Edit transaction</h3>
      <StyledSelect
        options={categories.map((c) => ({
          label: c.name,
          value: c.id,
          key: c.id,
        }))}
        value={category}
        onChange={(value) => setCategory(parseInt(value, 10))}
      />
      <Buttons>
        <StyledButton
          onClick={() => {
            onSave();
            updateCategory();
            transaction.category_id = category;
            updateTransaction(transaction, setTransactions);
          }}
        >
          Save
        </StyledButton>
        <Button onClick={onCancel}>Cancel</Button>
      </Buttons>
    </Wrapper>
  );
}

function updateTransaction(transaction, setTransactions) {
  setTransactions((prev) => {
    const slice = prev.slice();
    const index = slice.findIndex((t) => t.id === transaction.id);
    slice[index] = transaction;
    return slice;
  });
}

EditTransaction.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
  setTransactions: PropTypes.func.isRequired,
};

export default EditTransaction;
