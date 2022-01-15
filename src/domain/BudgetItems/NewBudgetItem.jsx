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
import PropTypes from "prop-types";
import { useCallback, useState, useMemo } from "react";
import CategoryPickerModalContent from "../EditTransaction/CategoryPickerModalContent";
import CategoryIcon from "../CategoryIcon/CategoryIcon";

function NewBudgetItem({
  onClose,
  isOpen,
  edit,
  budgetId,
  budgetItem,
  addBudgetItem,
  updateBudgetItem,
  categories,
}) {
  const [name, setName] = useState(edit ? budgetItem.name : "");
  const [positiveAmount, setPositiveAmount] = useState(
    edit ? budgetItem.positiveAmount : ""
  );
  const [negativeAmount, setNegativeAmount] = useState(
    edit ? budgetItem.negativeAmount : ""
  );
  const [categoryId, setCategoryId] = useState(
    edit ? budgetItem.categoryId : null
  );
  const [nameError, setNameError] = useState(null);
  const [amountError, setAmountError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

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

    if (edit) {
      updateBudgetItem({
        ...budgetItem,
        name,
        categoryId,
        positiveAmount:
          positiveAmount === "" ? null : parseInt(positiveAmount, 10),
        negativeAmount:
          negativeAmount === "" ? null : parseInt(negativeAmount, 10),
      });
    } else {
      console.log(categoryId);
      addBudgetItem({
        budgetId,
        name,
        categoryId,
        positiveAmount:
          positiveAmount === "" ? null : parseInt(positiveAmount, 10),
        negativeAmount:
          negativeAmount === "" ? null : parseInt(negativeAmount, 10),
      });
    }

    onClose();
    setName(edit ? name : "");
  }, [
    onClose,
    name,
    budgetItem,
    setNameError,
    edit,
    budgetItem,
    addBudgetItem,
    updateBudgetItem,
    categoryId,
    setCategoryError,
    positiveAmount,
    negativeAmount,
    setAmountError,
  ]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        {showChooseCategories ? (
          <CategoryPickerModalContent
            toggleCategoryPicker={() => setShowChooseCategories(false)}
            setNewCategory={(category) => {
              setCategoryId(category.id);
              setCategoryError(null);
            }}
            categories={categories}
            loading={false}
          />
        ) : (
          <>
            <ModalHeader>{edit ? "Edit budget" : "New budget"}</ModalHeader>
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
                  isInvalid={nameError}
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
                  isInvalid={amountError}
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
                  isInvalid={amountError}
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

NewBudgetItem.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  budgetId: PropTypes.number,
  budgetItem: PropTypes.object,
  addBudgetItem: PropTypes.func.isRequired,
  updateBudgetItem: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default NewBudgetItem;
