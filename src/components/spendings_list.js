import PropTypes from "prop-types";
import { useCategories, useSpendings } from "../hooks";
import List from "./list";
import ListItem from "./list_item";
import { formatCurrency } from "../utils/currency";
import styled from "styled-components";
import CategoryIcon from "./category_icon";

const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
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
                <p>{category.name}</p>
                <p>{formatCurrency(item.amount)}</p>
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
