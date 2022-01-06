import Spending from "./Spending";
import { Divider } from "@chakra-ui/react";
import PropTypes from "prop-types";

function SpendingsList({
  currentCategory,
  setCurrentCategory,
  spendings,
  categories,
  loading,
}) {
  return (
    !loading &&
    categories
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
      })
  );
}

SpendingsList.propTypes = {
  currentCategory: PropTypes.number,
  setCurrentCategory: PropTypes.func,
  spendings: PropTypes.array,
  categories: PropTypes.array,
  loading: PropTypes.bool,
};

export default SpendingsList;
