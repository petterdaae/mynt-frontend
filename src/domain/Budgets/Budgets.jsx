import { useBudgets } from "../../hooks";
import { useState } from "react";
import Budget from "./Budget";
import { Divider, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import NewBudget from "./NewBudget";

function Budgets() {
  const { budgets, deleteBudget, addBudget, updateBudget, loading } =
    useBudgets();
  const [newBudgetOpen, setNewBudgetOpen] = useState(false);
  return (
    <>
      <HStack justify="right" m="2">
        <IconButton
          aria-label="New budget"
          icon={<AddIcon />}
          colorScheme="green"
          onClick={() => setNewBudgetOpen(true)}
        />
      </HStack>
      <Divider />
      {!loading &&
        budgets.map((budget) => {
          return (
            <div key={budget.id}>
              <Budget
                budget={budget}
                deleteBudget={deleteBudget}
                addBudget={addBudget}
                updateBudget={updateBudget}
              />
              <Divider />
            </div>
          );
        })}
      <NewBudget
        isOpen={newBudgetOpen}
        onClose={() => setNewBudgetOpen(false)}
        addBudget={addBudget}
        updateBudget={updateBudget}
      />
    </>
  );
}

export default Budgets;
