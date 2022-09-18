import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Input,
  Divider,
  Text,
  HStack,
  Select,
} from "@chakra-ui/react";
import { useCallback, useState, useMemo } from "react";
import CategoryPickerModalContent from "../CategoryPicker/CategoryPickerModalContent";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { BudgetItem, Category } from "../../types";
import CurrencyInput from "../../components/CurrencyInput";
import BudgetItemCustomItems from "./BudgetItemCustomItems";
import EditableBudgetItemCustomItem from "../../types/EditableBudgetItemCustomItems";
import ResponsiveModal from "../../components/ResponsiveModal";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  budgetId: number;
  budgetItem: BudgetItem | null;
  addBudgetItem: (budgetItem: BudgetItem) => void;
  updateBudgetItem: (budgetItem: BudgetItem) => void;
  categories: Category[];
}

function NewBudgetItem({
  onClose,
  isOpen,
  budgetId,
  budgetItem,
  addBudgetItem,
  updateBudgetItem,
  categories,
}: Props) {
  const [showChooseCategories, setShowChooseCategories] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [name, setName] = useState(budgetItem ? budgetItem.name : "");

  const [amountError, setAmountError] = useState<string | null>(null);
  const [amount, setAmount] = useState(
    budgetItem ? budgetItem.monthlyAmount : null
  );

  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState(
    budgetItem ? budgetItem.categoryId : null
  );

  const [kind, setKind] = useState(budgetItem ? budgetItem.kind : "monthly");

  const [customItems, setCustomItems] = useState<
    EditableBudgetItemCustomItem[]
  >(budgetItem?.customItems ?? []);

  const category = useMemo(
    () =>
      categories.find((c) => c.id === categoryId) ?? {
        name: "No category",
        color: "lightgray",
      },
    [categories, categoryId]
  );

  const onSave = useCallback(() => {
    // Common
    const nameInvalid = name.trim().length === 0;
    const categoryInvalid = categoryId === null;
    if (nameInvalid) {
      setNameError("Name is required");
    }
    if (categoryInvalid) {
      setCategoryError("Category is required");
    }

    // Monthly
    if (kind === "monthly") {
      const amountInvalid = amount === null;
      if (amountInvalid) {
        setAmountError("InvalidAamount");
      }
      if (nameInvalid || categoryInvalid || amountInvalid) {
        return;
      }

      if (budgetItem) {
        updateBudgetItem({
          id: budgetItem.id,
          budgetId: budgetItem.budgetId,
          kind: "monthly",
          name,
          categoryId,
          monthlyAmount: amount,
          customItems: null,
        });
      } else {
        addBudgetItem({
          id: -1,
          budgetId,
          kind: "monthly",
          name,
          categoryId,
          monthlyAmount: amount,
          customItems: null,
        });
      }
    }

    if (kind === "custom") {
      const allHaveAmount = customItems.every((item) => item.amount !== null);
      const allHaveDate = customItems.every((item) => item.date !== null);
      if (nameInvalid || categoryInvalid || !allHaveAmount || !allHaveDate) {
        return;
      }

      const newCustomItems = customItems.map((item) => ({
        id: item.id,
        amount: item.amount as number,
        date: item.date as string,
      }));

      if (budgetItem) {
        updateBudgetItem({
          id: budgetItem.id,
          budgetId: budgetItem.budgetId,
          kind: "custom",
          name,
          categoryId,
          monthlyAmount: null,
          customItems: newCustomItems,
        });
      } else {
        addBudgetItem({
          id: -1,
          budgetId,
          kind: "custom",
          name,
          categoryId,
          monthlyAmount: null,
          customItems: newCustomItems,
        });
      }
    }

    onClose();

    setName(budgetItem ? name : "");
    setAmount(budgetItem ? amount : null);
    setCategoryId(budgetItem ? categoryId : null);
    setCustomItems(budgetItem ? customItems : []);
    setNameError(null);
    setAmountError(null);
    setCategoryError(null);
  }, [
    name,
    categoryId,
    kind,
    onClose,
    budgetItem,
    amount,
    updateBudgetItem,
    addBudgetItem,
    budgetId,
    customItems,
  ]);

  return (
    <ResponsiveModal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay bg="white" />
      <ModalContent boxShadow="none">
        {showChooseCategories ? (
          <CategoryPickerModalContent
            onCancel={() => setShowChooseCategories(false)}
            onSelect={(category) => {
              setCategoryId(category?.id ?? null);
              setCategoryError(null);
              setShowChooseCategories(false);
            }}
            categories={categories}
            loading={false}
          />
        ) : (
          <>
            <ModalHeader>
              {budgetItem ? "Edit budgetitem" : "New budgetitem"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select
                mb="2"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="custom">Custom</option>
              </Select>
              <Divider mb="2" />
              <VStack align="left">
                <Input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(null);
                  }}
                  placeholder="Name"
                  isInvalid={!!nameError}
                />
                {nameError && (
                  <Text color="crimson" fontSize="sm">
                    {nameError}
                  </Text>
                )}
                <Divider />
                <HStack justify="space-between">
                  <HStack>
                    <CategoryIcon color={category.color} size="sm" />
                    <Text fontWeight="semibold">{category.name}</Text>
                  </HStack>
                  <Button
                    variant="outline"
                    onClick={() => setShowChooseCategories(true)}
                  >
                    Choose category
                  </Button>
                </HStack>
                {categoryError && (
                  <Text color="crimson" fontSize="sm">
                    {categoryError}
                  </Text>
                )}
                <Divider />
                {kind === "monthly" && (
                  <>
                    <CurrencyInput value={amount} setValue={setAmount} />
                    {amountError && (
                      <Text color="crimson" fontSize="sm">
                        {amountError}
                      </Text>
                    )}
                  </>
                )}
                {kind === "custom" && (
                  <BudgetItemCustomItems
                    customItems={customItems}
                    setCustomItems={setCustomItems}
                  />
                )}

                <Divider />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button mr="8px" colorScheme="green" onClick={onSave}>
                Save
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  setName(budgetItem ? budgetItem.name : "");
                  setAmount(budgetItem ? budgetItem.monthlyAmount : null);
                  setCategoryId(budgetItem ? budgetItem.categoryId : null);
                  setCustomItems(
                    budgetItem?.customItems ? budgetItem.customItems : []
                  );
                  setNameError(null);
                  setAmountError(null);
                  setCategoryError(null);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ResponsiveModal>
  );
}

export default NewBudgetItem;
