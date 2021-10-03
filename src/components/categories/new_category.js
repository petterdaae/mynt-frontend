import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../text_input";
import Button from "../button";
import { base } from "../size";
import { useRef, useCallback, useState } from "react";
import ColorPicker from "../color_picker";

const StyledTextInput = styled(TextInput)`
  margin-bottom: ${2 * base}px;
`;

const StyledButton = styled(Button)`
  margin-right: ${4 * base}px;
`;

function NewCategory({ className, parentCategory, onCreate, onCancel }) {
  const nameInputRef = useRef();
  const [color, setColor] = useState(null);
  const [nameError, setNameError] = useState(null);

  const createCategory = useCallback(() => {
    if (
      !nameInputRef ||
      !nameInputRef.current ||
      nameInputRef.current.value.trim() === ""
    ) {
      setNameError("Name can not be empty");
      return;
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        name: nameInputRef.current.value,
        parent_id: parentCategory,
        color: color,
      }),
    })
      .then((res) => res.json())
      .then((newCategory) => onCreate(newCategory));
    nameInputRef.current.value = "";
  }, [nameInputRef, onCreate, color]);

  return (
    <div className={className}>
      <h3>New category</h3>
      <StyledTextInput
        placeholder="Name"
        ref={nameInputRef}
        error={nameError}
        onChange={() => setNameError(null)}
      />
      <ColorPicker value={color} onChange={setColor} />
      <br />
      <StyledButton onClick={createCategory}>Create</StyledButton>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
}

NewCategory.propTypes = {
  className: PropTypes.string,
  parentCategory: PropTypes.number,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
};

export default NewCategory;
