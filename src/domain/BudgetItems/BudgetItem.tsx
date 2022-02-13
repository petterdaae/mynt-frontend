import {
  HStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import NewBudgetItem from "./NewBudgetItem";
import { formatCurrency } from "../utils";
import { BudgetItem as BudgetItemType, Category } from "../../types";

interface Props {
  budgetItem: BudgetItemType;
  deleteBudgetItem: (budgetItemId: number) => void;
  addBudgetItem: (budgetItem: BudgetItemType) => void;
  updateBudgetItem: (budgetItem: BudgetItemType) => void;
  categories: Category[];
}

function BudgetItem({
  budgetItem,
  deleteBudgetItem,
  addBudgetItem,
  updateBudgetItem,
  categories,
}: Props) {
  const [editBudgetItemOpen, setEditBudgetItemOpen] = useState(false);
  const [showDeleteBudgetItem, setShowDeleteBudgetItem] = useState(false);
  const category = categories.find((c) => c.id === budgetItem.categoryId) ?? {
    color: "lightgray",
  };
  return (
    <>
      <HStack
        justify="space-between"
        m="4px"
        p="4px"
        borderRadius="md"
        _hover={{ background: "whitesmoke", cursor: "pointer" }}
        onClick={() => {
          setEditBudgetItemOpen(true);
        }}
      >
        <HStack>
          <CategoryIcon color={category.color} />
          <Text>{budgetItem.name}</Text>
        </HStack>
        <HStack>
          {budgetItem.negativeAmount && (
            <Badge colorScheme="red" size="lg" fontSize="1.0em">
              {formatCurrency(budgetItem.negativeAmount)}
            </Badge>
          )}
          {budgetItem.positiveAmount && (
            <Badge colorScheme="blue" size="lg" fontSize="1.0em">
              {formatCurrency(budgetItem.positiveAmount)}
            </Badge>
          )}
          <IconButton
            aria-label="Delete budget"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={(e) => {
              setShowDeleteBudgetItem(true);
              e.stopPropagation();
            }}
          />
        </HStack>
      </HStack>
      <NewBudgetItem
        isOpen={editBudgetItemOpen}
        onClose={() => setEditBudgetItemOpen(false)}
        budgetId={budgetItem.budgetId}
        budgetItem={budgetItem}
        addBudgetItem={addBudgetItem}
        updateBudgetItem={updateBudgetItem}
        categories={categories}
      />
      <Modal
        isOpen={showDeleteBudgetItem}
        onClose={() => setShowDeleteBudgetItem(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this budget item?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteBudgetItem(budgetItem.id);
                setShowDeleteBudgetItem(false);
              }}
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowDeleteBudgetItem(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BudgetItem;
