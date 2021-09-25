import PropTypes from "prop-types";
import { Select, Button } from "..";
import { base } from "../size";
import styled from "styled-components";
import { useState } from "react";
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

function EditTransaction({ onSave, onCancel, transaction }) {
  const categories = useCategories();
  const [category, setCategory] = useState(transaction.category);
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
        onChange={setCategory}
      />
      <Buttons>
        <StyledButton onClick={onSave}>Save</StyledButton>
        <Button onClick={onSave}>Cancel</Button>
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
