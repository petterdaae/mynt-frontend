import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../text_input";
import Button from "../button";
import { base } from "../size";
import { useRef, useCallback } from "react";

const StyledTextInput = styled(TextInput)`
  margin-bottom: ${4 * base}px;
`;

function NewCategory({ className, parentCategory, onCreate }) {
  const nameInputRef = useRef();

  const createCategory = useCallback(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        name: nameInputRef.current.value,
        parent_id: parentCategory,
      }),
    })
      .then((res) => res.json())
      .then((newCategory) => onCreate(newCategory));
    nameInputRef.current.value = "";
    close();
  }, [nameInputRef, onCreate]);

  return (
    <div className={className}>
      <h3>New category</h3>
      <StyledTextInput placeholder="Name" ref={nameInputRef} />
      <br />
      <Button onClick={createCategory}>Create</Button>
    </div>
  );
}

NewCategory.propTypes = {
  className: PropTypes.string,
  parentCategory: PropTypes.number,
  onCreate: PropTypes.func,
};

export default NewCategory;
