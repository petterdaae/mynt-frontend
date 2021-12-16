import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../../components/text_input";
import { Button } from "../../components";
import { base } from "../../components/size";
import { useCallback, useState } from "react";
import ColorPicker from "../../components/color_picker";
import { useCategories } from "../../hooks";
import { Checkbox } from "@chakra-ui/react";

const StyledTextInput = styled(TextInput)`
  margin-bottom: ${2 * base}px;
`;

const StyledButton = styled(Button)`
  margin-right: ${4 * base}px;
`;

function NewCategory({ className, parentCategory, onClose, edit }) {
  const { categories, addCategory, updateCategory } = useCategories();
  const category = categories.find((c) => c.id === parentCategory);
  const [name, setName] = useState(edit ? category.name : "");
  const [color, setColor] = useState(edit ? category.color : null);
  const [ignore, setIgnore] = useState(
    edit ? category.ignore !== null && category.ignore : false
  );
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

    if (edit) {
      updateCategory(parentCategory, {
        name: name,
        color: color,
        ignore: ignore,
      });
    } else {
      addCategory({
        name: name,
        parent_id: parentCategory,
        color: color,
        ignore: ignore,
      });
    }

    setName("");
    setColor(null);
    setIgnore(false);
    onClose();
  }, [name, onClose, addCategory, color, edit, parentCategory, ignore]);

  return (
    <div className={className}>
      <h3>{edit ? "Edit category" : "New category"}</h3>
      <StyledTextInput
        placeholder="Name"
        error={nameError}
        value={name}
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
      <Checkbox isChecked={ignore} onChange={() => setIgnore((prev) => !prev)}>
        Ignore in summaries
      </Checkbox>
      <br />
      <StyledButton onClick={createCategory}>
        {edit ? "Update" : "Create"}
      </StyledButton>

      <Button
        onClick={() => {
          setName("");
          setColor(null);
          onClose();
        }}
      >
        Cancel
      </Button>
    </div>
  );
}

NewCategory.propTypes = {
  className: PropTypes.string,
  parentCategory: PropTypes.number,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  edit: PropTypes.bool,
};

export default NewCategory;
