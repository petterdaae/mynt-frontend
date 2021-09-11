import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../text_input";
import Button from "../button";
import { base } from "../size";
import { useRef, useCallback } from "react";

const StyledNewCategory = styled(NewCategory)``;

const StyledTextInput = styled(TextInput)`
  margin-bottom: ${4 * base}px;
`;

function NewCategory({ className, currentCategoryId, setCategories, close }) {
  const nameInputRef = useRef();

  const createCategory = useCallback(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        name: nameInputRef.current.value,
        parent_id: currentCategoryId,
      }),
    })
      .then((res) => res.json())
      .then((newCategory) => setCategories((prev) => [...prev, newCategory]));
    nameInputRef.current.value = "";
    close();
  }, [nameInputRef, setCategories, close]);

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
  currentCategoryId: PropTypes.number,
  setCategories: PropTypes.func,
  close: PropTypes.func,
};

export default StyledNewCategory;
