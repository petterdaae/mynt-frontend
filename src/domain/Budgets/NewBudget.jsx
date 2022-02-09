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
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import ColorPicker from "../../components/ColorPicker";
import { useCallback, useState } from "react";

function NewBudget({ onClose, isOpen, edit, budget, addBudget, updateBudget }) {
  const [name, setName] = useState(edit ? budget.name : "");
  const [color, setColor] = useState(edit ? budget.color : null);

  const [nameError, setNameError] = useState(null);
  const [colorError, setColorError] = useState(null);

  const onSave = useCallback(() => {
    const nameInvalid = name.trim().length === 0;
    const colorInvalid = color === null;

    if (nameInvalid) {
      setNameError("Name is required");
    }

    if (colorInvalid) {
      setColorError("Color is required");
    }

    if (colorInvalid || nameInvalid) {
      return;
    }

    if (edit) {
      updateBudget({
        ...budget,
        name: name,
        color: color,
      });
    } else {
      addBudget({
        name: name,
        color: color,
      });
    }

    onClose();
    setName(edit ? name : "");
    setColor(edit ? color : null);
  }, [
    onClose,
    name,
    color,
    budget,
    setNameError,
    setColorError,
    edit,
    budget,
    addBudget,
    updateBudget,
  ]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
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
            <ColorPicker
              value={color}
              onChange={(color) => {
                setColor(color);
                setColorError(null);
              }}
              error={colorError}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button mr="8px" colorScheme="green" onClick={onSave}>
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

NewBudget.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  budget: PropTypes.object,
  addBudget: PropTypes.func.isRequired,
  updateBudget: PropTypes.func.isRequired,
};

export default NewBudget;
