import { useBudgetItems } from "../../hooks";
import { useState } from "react";
import BudgetItem from "./BudgetItem";
import { Divider, HStack, IconButton, Text } from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import NewBudgetItem from "./NewBudgetItem";
import PropTypes from "prop-types";

function BudgetItems({ budget, setCurrentBudget, categories }) {
  const {
    budgetItems,
    deleteBudgetItem,
    addBudgetItem,
    updateBudgetItem,
    loading,
  } = useBudgetItems();
  const [newBudgetOpen, setNewBudgetOpen] = useState(false);
  return (
    <>
      <HStack justify="space-between" m="2">
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          onClick={() => setCurrentBudget(null)}
        />
        <Text>{budget.name}</Text>
        <IconButton
          aria-label="New budget item"
          icon={<AddIcon />}
          colorScheme="green"
          onClick={() => setNewBudgetOpen(true)}
        />
      </HStack>
      <Divider />
      {!loading &&
        budgetItems
          .filter((i) => i.budgetId === budget.id)
          .map((budgetItem) => {
            return (
              <div key={budgetItem.id}>
                <BudgetItem
                  budgetItem={budgetItem}
                  deleteBudgetItem={deleteBudgetItem}
                  addBudgetItem={addBudgetItem}
                  updateBudgetItem={updateBudgetItem}
                  categories={categories}
                />
                <Divider />
              </div>
            );
          })}
      <NewBudgetItem
        isOpen={newBudgetOpen}
        onClose={() => setNewBudgetOpen(false)}
        addBudgetItem={addBudgetItem}
        updateBudgetItem={updateBudgetItem}
        categories={categories}
        budgetId={budget.id}
      />
    </>
  );
}

BudgetItems.propTypes = {
  budget: PropTypes.object.isRequired,
  setCurrentBudget: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default BudgetItems;
