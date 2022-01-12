import Spending from "./Spending";
import { Divider } from "@chakra-ui/react";
import PropTypes from "prop-types";

function SpendingsList({
  currentCategory,
  setCurrentCategory,
  spendings,
  categories,
}) {
  return categories
    .filter((category) => category.parentId === currentCategory)
    .map((category) => {
      const spending = spendings.find((s) => s.category.id === category.id);
      return (
        spending && (
          <div key={category.id}>
            <Spending
              spending={spending}
              category={category}
              setCurrentCategory={setCurrentCategory}
            />
            <Divider />
          </div>
        )
      );
    });
}

SpendingsList.propTypes = {
  currentCategory: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  setCurrentCategory: PropTypes.func.isRequired,
  spendings: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default SpendingsList;
