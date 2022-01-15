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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import PropTypes from "prop-types";
import NewBudgetItem from "./NewBudgetItem";

function BudgetItem({
  budgetItem,
  deleteBudgetItem,
  addBudgetItem,
  updateBudgetItem,
  categories,
}) {
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
        onClick={() => {}}
      >
        <HStack>
          <CategoryIcon color={category.color} />
          <Text>{budgetItem.name}</Text>
        </HStack>
        <HStack>
          <IconButton
            aria-label="Edit budget"
            icon={<EditIcon />}
            onClick={(e) => {
              setEditBudgetItemOpen(true);
              e.stopPropagation();
            }}
          />
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
        edit={true}
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

BudgetItem.propTypes = {
  budgetItem: PropTypes.object.isRequired,
  deleteBudgetItem: PropTypes.func.isRequired,
  addBudgetItem: PropTypes.func.isRequired,
  updateBudgetItem: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

export default BudgetItem;
