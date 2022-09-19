import {
  ModalOverlay,
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
import ColorPicker from "../../components/ColorPicker";
import { useCallback, useState } from "react";
import { Budget } from "../../types";
import ResponsiveModal from "../../components/ResponsiveModal";
import ResponsiveModalContent from "../../components/ResponsiveModalContent";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  budget: Budget | null;
  addBudget: (budget: Budget) => void;
  updateBudget: (budget: Budget) => void;
}

function NewBudget({
  onClose,
  isOpen,
  budget,
  addBudget,
  updateBudget,
}: Props) {
  const [name, setName] = useState(budget ? budget.name : "");
  const [color, setColor] = useState(budget ? budget.color : null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);

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

    if (budget) {
      updateBudget({
        ...budget,
        name: name,
        color: color,
      });
    } else {
      addBudget({
        id: -1,
        name: name,
        color: color,
      });
    }

    onClose();
    setName(budget ? name : "");
    setColor(budget ? color : null);
  }, [
    onClose,
    name,
    color,
    budget,
    setNameError,
    setColorError,
    addBudget,
    updateBudget,
  ]);

  return (
    <ResponsiveModal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay bg="white" />
      <ResponsiveModalContent>
        <ModalHeader>{budget ? "Edit budget" : "New budget"}</ModalHeader>
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
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}

export default NewBudget;
