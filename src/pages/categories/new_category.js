import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../../components/text_input";
import { Button } from "../../components";
import { base } from "../../components/size";
import { useCallback, useState } from "react";
import ColorPicker from "../../components/color_picker";

const StyledTextInput = styled(TextInput)`
  margin-bottom: ${2 * base}px;
`;

const StyledButton = styled(Button)`
  margin-right: ${4 * base}px;
`;

function NewCategory({ className, parentCategory, onCreate, onCancel }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [colorError, setColorError] = useState(null);

  const createCategory = useCallback(() => {
    const hasNameError = name.trim() === "";
    const hasColorError = !color;

    if (hasNameError) {
      setNameError("Name can not be empty");
    }

    if (hasColorError) {
      setColorError("Pick a color");
    }

    if (hasNameError || hasColorError) {
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        name: name,
        parent_id: parentCategory,
        color: color,
      }),
    })
      .then((res) => res.json())
      .then((newCategory) => onCreate(newCategory));
    setName("");
    setColor(null);
  }, [name, onCreate, color]);

  return (
    <div className={className}>
      <h3>New category</h3>
      <StyledTextInput
        placeholder="Name"
        error={nameError}
        onChange={(value) => {
          setNameError(null);
          setName(value);
        }}
      />
      <ColorPicker
        value={color}
        onChange={(color) => {
          setColorError(null);
          setColor(color);
        }}
        error={colorError}
      />
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
