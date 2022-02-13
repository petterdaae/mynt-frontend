import {
  Modal,
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
} from "@chakra-ui/react";
import { useCallback, useState, useMemo } from "react";
import CategoryPickerModalContent from "../CategoryPicker/CategoryPickerModalContent";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import { BudgetItem, Category } from "../../types";

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
  const initialValue = useCallback(
    (value) => (value ? Math.round(value / 100) : "").toString(),
    []
  );

  const [name, setName] = useState(budgetItem ? budgetItem.name : "");
  const [positiveAmount, setPositiveAmount] = useState(
    budgetItem ? initialValue(budgetItem.positiveAmount) : ""
  );
  const [negativeAmount, setNegativeAmount] = useState(
    budgetItem ? initialValue(budgetItem.negativeAmount) : ""
  );
  const [categoryId, setCategoryId] = useState(
    budgetItem ? budgetItem.categoryId : null
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [showChooseCategories, setShowChooseCategories] = useState(false);

  const category = useMemo(
    () =>
      categories.find((c) => c.id === categoryId) ?? {
        name: "No category",
        color: "lightgray",
      },
    [categories, categoryId]
  );

  const onSave = useCallback(() => {
    const nameInvalid = name.trim().length === 0;
    const categoryInvalid = categoryId === null;

    const positiveAmountValid = parseInt(positiveAmount, 10) >= 0;
    const negativeAmountValid = parseInt(negativeAmount, 10) >= 0;

    const amountValid =
      (positiveAmountValid && negativeAmountValid) ||
      (positiveAmountValid && negativeAmount === "") ||
      (negativeAmountValid && positiveAmount === "");

    if (nameInvalid) {
      setNameError("Name is required");
    }

    if (categoryInvalid) {
      setCategoryError("Category is required");
    }

    if (!amountValid) {
      setAmountError(
        "Positive or negative amount is required to be an integer"
      );
    }

    if (nameInvalid || categoryInvalid || !amountValid) {
      return;
    }

    if (budgetItem) {
      updateBudgetItem({
        ...budgetItem,
        name,
        categoryId,
        positiveAmount:
          positiveAmount === "" ? null : parseInt(positiveAmount, 10) * 100,
        negativeAmount:
          negativeAmount === "" ? null : parseInt(negativeAmount, 10) * 100,
      });
    } else {
      addBudgetItem({
        id: -1,
        budgetId,
        name,
        categoryId,
        positiveAmount:
          positiveAmount === "" ? null : parseInt(positiveAmount, 10) * 100,
        negativeAmount:
          negativeAmount === "" ? null : parseInt(negativeAmount, 10) * 100,
      });
    }

    onClose();
    setName(budgetItem ? name : "");
    setPositiveAmount(budgetItem ? positiveAmount : "");
    setNegativeAmount(budgetItem ? negativeAmount : "");
    setCategoryId(budgetItem ? categoryId : null);
    setNameError(null);
    setAmountError(null);
    setCategoryError(null);
  }, [
    name,
    categoryId,
    positiveAmount,
    negativeAmount,
    onClose,
    updateBudgetItem,
    budgetItem,
    addBudgetItem,
    budgetId,
  ]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        {showChooseCategories ? (
          <CategoryPickerModalContent
            onCancel={() => setShowChooseCategories(false)}
            onSelect={(category) => {
              setCategoryId(category.id);
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
                <Input
                  value={negativeAmount}
                  onChange={(e) => {
                    setNegativeAmount(e.target.value);
                    setAmountError(null);
                  }}
                  placeholder="Spending budget"
                  isInvalid={!!amountError}
                />
                {amountError && (
                  <Text color="crimson" fontSize="sm">
                    {amountError}
                  </Text>
                )}
                <Divider />
                <Input
                  value={positiveAmount}
                  onChange={(e) => {
                    setPositiveAmount(e.target.value);
                    setAmountError(null);
                  }}
                  placeholder="Earning budget"
                  isInvalid={!!amountError}
                />
                {amountError && (
                  <Text color="crimson" fontSize="sm">
                    {amountError}
                  </Text>
                )}
                <Divider />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button mr="8px" colorScheme="green" onClick={onSave}>
                Save
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default NewBudgetItem;
