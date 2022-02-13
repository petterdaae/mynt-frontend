import { useBudgets, useCategories, useSettings } from "../../hooks";
import { useState } from "react";
import Budget from "./Budget";
import { Divider, HStack, IconButton, Center, Spinner } from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import NewBudget from "./NewBudget";
import BudgetItems from "../BudgetItems/BudgetItems";
import { Budget as BudgetType } from "../../types";

function Budgets() {
  const {
    budgets,
    deleteBudget,
    addBudget,
    updateBudget,
    loading: budgetsLoading,
  } = useBudgets();
  const { categories, loading: categoriesLoading } = useCategories();
  const [newBudgetOpen, setNewBudgetOpen] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<number | null>(null);
  const { settings, update: updateSettings } = useSettings();
  return !(budgetsLoading || categoriesLoading) ? (
    currentBudget === null ? (
      <>
        <HStack justify="space-between" m="2">
          <IconButton
            aria-label="Back"
            icon={<ArrowBackIcon />}
            onClick={() => {}}
            disabled
          />

          <IconButton
            aria-label="New budget"
            icon={<AddIcon />}
            colorScheme="green"
            onClick={() => setNewBudgetOpen(true)}
          />
        </HStack>
        <Divider />
        {budgets.map((budget) => {
          return (
            <div key={budget.id}>
              <Budget
                setCurrentBudget={setCurrentBudget}
                budget={budget}
                deleteBudget={deleteBudget}
                addBudget={addBudget}
                updateBudget={updateBudget}
                mainBudgetId={settings?.mainBudgetId ?? null}
                setMainBudgetId={(id) =>
                  updateSettings({ ...settings, mainBudgetId: id })
                }
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
          budget={null}
        />
      </>
    ) : (
      <BudgetItems
        budget={budgets.find((b) => b.id === currentBudget) as BudgetType}
        categories={categories}
        setCurrentBudget={setCurrentBudget}
      />
    )
  ) : (
    <Center mt="8">
      <Spinner size="xl" />
    </Center>
  );
}

export default Budgets;
