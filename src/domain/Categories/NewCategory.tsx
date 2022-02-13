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
import ColorPicker from "../../components/ColorPicker";
import { useCallback, useState } from "react";
import { Category } from "../../types";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  category: Category | null;
  parentCategory: number | null;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
}

function NewCategory({
  onClose,
  isOpen,
  category,
  parentCategory,
  addCategory,
  updateCategory,
}: Props) {
  const [name, setName] = useState(category ? category.name : "");
  const [color, setColor] = useState(category ? category.color : null);
  const [ignoreInSummaries, setIgnoreInSummaries] = useState(
    category ? category.ignore : false
  );

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

    if (category) {
      updateCategory({
        ...category,
        name: name,
        color: color,
        ignore: ignoreInSummaries,
      });
    } else {
      addCategory({
        id: -1,
        name: name,
        parentId: parentCategory,
        color: color,
        ignore: ignoreInSummaries,
      });
    }

    onClose();
    setName(category ? name : "");
    setColor(category ? color : null);
    setIgnoreInSummaries(category ? ignoreInSummaries : false);
  }, [
    onClose,
    name,
    color,
    ignoreInSummaries,
    setNameError,
    setColorError,
    category,
    parentCategory,
    addCategory,
    updateCategory,
  ]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{category ? "Edit category" : "New category"}</ModalHeader>
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
            <Text fontSize="sm">
              If you check this box, the transactions in this category will not
              be inlcuded in summaries in the spendings tab. Sub-categories will
              still be included.
            </Text>
            <Checkbox
              isChecked={!!ignoreInSummaries}
              onChange={(e) => setIgnoreInSummaries(e.target.checked)}
              size="lg"
            >
              <Text fontSize="sm">Ignore in spendings</Text>
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

export default NewCategory;
