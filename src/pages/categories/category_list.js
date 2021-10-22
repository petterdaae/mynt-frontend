import List from "../../components/list";
import PropTypes from "prop-types";
import CategoryIcon from "../../components/category_icon";
import styled from "styled-components";
import ListItem from "../../components/list_item";
import { useSpendings } from "../../hooks";
import { Currency } from "../../components";

const CategoryName = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Spending = styled(Currency)`
  display: inline-block;
  vertical-align: middle;
  flex: 1;
  text-align: right;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

function CategoryList({ categories, setBreadcrumb }) {
  const { spendings } = useSpendings();
  return (
    categories.length > 0 && (
      <List>
        {categories.map((category) => {
          const spending = spendings.find((s) => s.category_id === category.id);
          const amount = spending ? spending.amount : 0;
          return (
            <StyledListItem
              key={category.id}
              onClick={() => setBreadcrumb((prev) => [...prev, category.id])}
            >
              <CategoryIcon color={category.color} />
              <CategoryName>{category.name}</CategoryName>
              <Spending value={amount} />
            </StyledListItem>
          );
        })}
      </List>
    )
  );
}

CategoryList.propTypes = {
  categories: PropTypes.array,
  setBreadcrumb: PropTypes.func,
  className: PropTypes.string,
};

export default CategoryList;
