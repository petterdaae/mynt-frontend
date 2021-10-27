import styled from "styled-components";
import PropTypes from "prop-types";
import { base } from "./size";
import { mainFontColor } from "./color";
import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const CategoryIcon = styled.div`
  display: inline-block;
  height: ${4 * base}px;
  width: ${4 * base}px;
  background: ${(props) => props.color};
  border-radius: 50%;
  padding: ${base / 2}px;
  margin-right: ${2 * base}px;
`;

const StyledCategoryPicker = styled(CategoryPicker)`
  padding: ${2 * base}px;
`;

const Wrapper = styled.div`
  margin-bottom: ${2 * base}px;
  position: relative;
`;

const Selected = styled.div`
  display: flex;
  padding: ${2 * base}px ${2 * base}px ${2 * base}px ${3 * base}px;
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
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid lightgray;
  &:last-child {
    border-bottom: none;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  padding: ${2 * base}px;
  flex: 1;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const OptionButton = styled.div`
  display: flex;
  padding: ${2 * base}px;
  border-left: 1px solid lightgray;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const Back = styled(Option)`
  padding: ${2 * base}px;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

function CategoryPicker({ selected, onChange, label }) {
  const [open, setOpen] = useState(false);
  const { categories } = useCategories();
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const currentCategories = categories.filter(
    (c) => c.parent_id === currentCategoryId
  );
  return (
    <Wrapper>
      <Selected onClick={() => setOpen((prev) => !prev)}>
        {selected && <CategoryIcon color={selected.color} />}
        {selected ? selected.name : label}
      </Selected>
      <Options open={open}>
        {currentCategoryId !== null && (
          <Back
            key={-1}
            onClick={() => {
              const currentCategory = categories.find(
                (c) => c.id === currentCategoryId
              );
              setCurrentCategoryId(currentCategory.parent_id);
            }}
          >
            <AiOutlineArrowLeft />
          </Back>
        )}
        {currentCategories.map((category) => (
          <Option key={category.id}>
            <SubWrapper
              onClick={() => {
                onChange(category);
                setOpen(false);
              }}
            >
              <CategoryIcon color={category.color} />
              {category.name}
            </SubWrapper>
            {categories.filter((c) => c.parent_id === category.id).length >
              0 && (
              <OptionButton
                onClick={() => {
                  setCurrentCategoryId(category.id);
                }}
              >
                <AiOutlineArrowRight />
              </OptionButton>
            )}
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
