import List from "../list";
import PropTypes from "prop-types";
import RandomIcon from "../random_icon";
import styled from "styled-components";
import ListItem from "../list_item";

const CategoryName = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

function CategoryList({ categories, setBreadcrumb, className }) {
  return (
    categories.length > 0 && (
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            onClick={() => setBreadcrumb((prev) => [...prev, category.id])}
          >
            <RandomIcon />
            <CategoryName>{category.name}</CategoryName>
          </ListItem>
        ))}
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
