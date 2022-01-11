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
  Checkbox,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import ColorPicker from "../../components/color_picker";
import { useCallback, useState } from "react";

function NewCategory({
  onClose,
  isOpen,
  edit,
  category,
  parentCategory,
  addCategory,
  updateCategory,
}) {
  const [name, setName] = useState(edit ? category.name : "");
  const [color, setColor] = useState(edit ? category.color : null);
  const [budget, setBudget] = useState(edit ? category.budget ?? "" : "");
  const [ignoreInSummaries, setIgnoreInSummaries] = useState(
    edit ? category.ignore : false
  );

  const [nameError, setNameError] = useState(null);
  const [colorError, setColorError] = useState(null);
  const [budgetError, setBudgetError] = useState(null);

  const onSave = useCallback(() => {
    const nameInvalid = name.trim().length === 0;
    const colorInvalid = color === null;
    const budgetInvalid = !(budget === "" || parseInt(budget, 10) >= 0);

    if (nameInvalid) {
      setNameError("Name is required");
    }

    if (colorInvalid) {
      setColorError("Color is required");
    }

    if (budgetInvalid) {
      setBudgetError("Budget should be an integer");
    }

    console.log(budget, budgetInvalid);

    if (colorInvalid || nameInvalid || budgetInvalid) {
      return;
    }

    if (edit) {
      updateCategory({
        ...category,
        name: name,
        color: color,
        ignore: ignoreInSummaries,
        budget: budget === "" ? null : parseInt(budget, 10),
      });
    } else {
      addCategory({
        name: name,
        parentId: parentCategory,
        color: color,
        ignore: ignoreInSummaries,
        budget: budget === "" ? null : parseInt(budget, 10),
      });
    }

    onClose();
    setName(edit ? name : "");
    setColor(edit ? color : null);
    setIgnoreInSummaries(edit ? ignoreInSummaries : false);
    setBudget(edit ? budget ?? "" : "");
  }, [
    onClose,
    name,
    color,
    ignoreInSummaries,
    budget,
    setNameError,
    setColorError,
    setBudgetError,
    edit,
    category,
    parentCategory,
    addCategory,
    updateCategory,
  ]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New category</ModalHeader>
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
            />
            <Text color="red" size="sm">
              {nameError}
            </Text>
            <Divider />
            <Checkbox
              isChecked={ignoreInSummaries}
              onChange={(e) => setIgnoreInSummaries(e.target.checked)}
            >
              Ignore in spendings
            </Checkbox>
            <Divider />
            <ColorPicker
              value={color}
              onChange={(color) => {
                setColor(color);
                setColorError(null);
              }}
              error={colorError}
            />
            <Divider />
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                $
              </InputLeftElement>
              <Input
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </InputGroup>
            <Text color="red" size="sm">
              {budgetError}
            </Text>
            <Divider />
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

NewCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
  category: PropTypes.object,
  parentCategory: PropTypes.number,
  addCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

export default NewCategory;
