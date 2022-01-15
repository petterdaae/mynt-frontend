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
import NewBudget from "./NewBudget";

function Budget({
  budget,
  deleteBudget,
  addBudget,
  updateBudget,
  setCurrentBudget,
}) {
  const [editBudgetOpen, setEditBudgetOpen] = useState(false);
  const [showDeleteBudget, setShowDeleteBudget] = useState(false);
  return (
    <>
      <HStack
        justify="space-between"
        m="4px"
        p="4px"
        borderRadius="md"
        _hover={{ background: "whitesmoke", cursor: "pointer" }}
        onClick={() => setCurrentBudget(budget.id)}
      >
        <HStack>
          <CategoryIcon color={budget.color} />
          <Text>{budget.name}</Text>
        </HStack>
        <HStack>
          <IconButton
            aria-label="Edit budget"
            icon={<EditIcon />}
            onClick={(e) => {
              setEditBudgetOpen(true);
              e.stopPropagation();
            }}
          />
          <IconButton
            aria-label="Delete budget"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={(e) => {
              setShowDeleteBudget(true);
              e.stopPropagation();
            }}
          />
        </HStack>
      </HStack>
      <NewBudget
        isOpen={editBudgetOpen}
        onClose={() => setEditBudgetOpen(false)}
        edit={true}
        budget={budget}
        addBudget={addBudget}
        updateBudget={updateBudget}
      />
      <Modal
        isOpen={showDeleteBudget}
        onClose={() => setShowDeleteBudget(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this budget?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteBudget(budget.id);
                setShowDeleteBudget(false);
              }}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setShowDeleteBudget(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

Budget.propTypes = {
  budget: PropTypes.object.isRequired,
  deleteBudget: PropTypes.func.isRequired,
  addBudget: PropTypes.func.isRequired,
  updateBudget: PropTypes.func.isRequired,
  setCurrentBudget: PropTypes.func.isRequired,
};

export default Budget;
