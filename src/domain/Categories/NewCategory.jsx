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
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import ColorPicker from "../../components/color_picker";
import { useCallback, useState } from "react";

function NewCategory({ onClose, isOpen, edit, category }) {
  const [name, setName] = useState(category ? category.name : "");
  const [color, setColor] = useState(category ? category.color : null);
  const [ignoreInSummaries, setIgnoreInSummaries] = useState(
    category ? category.ignoreFromSummaries : false
  );

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

    onClose();
    setName(category ? category.name : "");
    setColor(category ? category.color : null);
    setIgnoreInSummaries(category ? category.ignoreFromSummaries : false);
  }, [onClose, name, color, ignoreInSummaries, setNameError, setColorError]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="left">
            <Input
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
              onChange={() => setIgnoreInSummaries((prev) => !prev)}
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
};

export default NewCategory;
