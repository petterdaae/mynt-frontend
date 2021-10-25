import PropTypes from "prop-types";
import { Button } from "../../components";
import { base } from "../../components/size";
import styled from "styled-components";
import { useState } from "react";
import { useCategories, useTransactions } from "../../hooks";
import CategoryPicker from "../../components/category_picker";

const StyledButton = styled(Button)`
  margin-right: ${4 * base}px;
`;

const StyledCategoryPicker = styled(CategoryPicker)`
  margin-bottom: ${4 * base}px;
`;

const Wrapper = styled.div``;

const Buttons = styled.div`
  display: flex;
`;

function EditTransaction({ onSave, onCancel, transaction }) {
  const { updateTransactionCategory } = useTransactions();
  const { categories } = useCategories();
  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
    key: category.id,
  }));
  const [category, setCategory] = useState(
    options.find((option) => option.value === transaction.category_id)
  );

  return (
    <Wrapper>
      <h3>Edit transaction</h3>
      <StyledCategoryPicker
        options={options}
        selected={category}
        onChange={setCategory}
        label="Select a category"
      />
      <Buttons>
        <StyledButton
          onClick={() => {
            onSave();
            updateTransactionCategory(transaction, category.value);
          }}
        >
          Save
        </StyledButton>
        <Button onClick={onCancel}>Cancel</Button>
      </Buttons>
    </Wrapper>
  );
}

EditTransaction.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

export default EditTransaction;
