import PropTypes from "prop-types";
import { useCategories, useSpendings } from "../hooks";
import List from "./list";
import ListItem from "./list_item";
import styled from "styled-components";
import CategoryIcon from "./category_icon";
import Currency from "./currency";

const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledName = styled.p`
  flex: 1;
  align-items: center;
  display: flex;
`;

const StyledCurrency = styled(Currency)`
  align-items: center;
  display: flex;
`;

function SpendingsList({ className }) {
  const { spendings } = useSpendings();
  const { categories } = useCategories();
  return (
    spendings.length !== 0 &&
    categories.length !== 0 && (
      <div className={className}>
        <List>
          {spendings.map((item) => {
            const category = categories.find((c) => c.id === item.category_id);
            if (!category) return null;
            return (
              <StyledListItem key={item.category_id}>
                <CategoryIcon color={category.color} />
                <StyledName>{category.name}</StyledName>
                <StyledCurrency value={item.amount} />
              </StyledListItem>
            );
          })}
        </List>
      </div>
    )
  );
}

SpendingsList.propTypes = {
  className: PropTypes.string,
};

export default SpendingsList;
