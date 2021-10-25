import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "./size";
import { mainFontColor } from "./color";
import { useState } from "react";
import { useCategories } from "../hooks/useCategories";

const StyledCategoryPicker = styled(CategoryPicker)`
  padding: ${2 * base}px;
`;

const Wrapper = styled.div`
  margin-bottom: ${2 * base}px;
  position: relative;
`;

const Selected = styled.div`
  padding: ${2 * base}px ${5 * base}px ${2 * base}px ${5 * base}px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid lightgray;
  font-family: inherit;
  font-size: ${4 * base}px;

  &:hover {
    cursor: pointer;
    border: 1px solid ${mainFontColor};
  }

  &:active {
    background-color: lightgray;
  }

  &:disabled,
  [disabled] {
    background-color: lightgray;
    &:hover {
      cursor: not-allowed;
      border: 1px solid lightgray;
    }
  }
`;

const Options = styled.div`
  position: absolute;
  border: 1px solid lightgray;
  border-top: none;
  width: 100%;
  box-sizing: border-box;
  ${(props) => !props.open && "display: none;"}
`;

const Option = styled.div`
  background-color: #fff;
  padding: ${2 * base}px ${5 * base}px ${2 * base}px ${5 * base}px;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

function CategoryPicker({ selected, onChange, label }) {
  const [open, setOpen] = useState(false);
  const { categories } = useCategories();
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const options = categories.filter((c) => c.parent_id === currentCategoryId);
  console.log(categories);
  return (
    <Wrapper>
      <Selected onClick={() => setOpen((prev) => !prev)}>
        {selected ? selected.label : label}
      </Selected>
      <Options open={open}>
        {currentCategoryId !== null && (
          <Option
            key={-1}
            onClick={() => {
              const currentCategory = categories.find(
                (c) => c.id === currentCategoryId
              );
              setCurrentCategoryId(currentCategory.parent_id);
            }}
          >
            Back
          </Option>
        )}
        {options.map((option) => (
          <Option
            key={option.id}
            onClick={() => {
              const children = categories.filter(
                (c) => c.parent_id === option.id
              );
              if (children.length > 0) {
                setCurrentCategoryId(option.id);
                return;
              }
              setOpen(false);
              onChange(option);
            }}
          >
            {option.name}
          </Option>
        ))}
      </Options>
    </Wrapper>
  );
}

CategoryPicker.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

export default StyledCategoryPicker;
