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
  HStack,
} from "@chakra-ui/react";
import ColorPicker from "../../components/ColorPicker";
import { useCallback, useEffect, useState } from "react";
import { Category } from "../../types";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import CategoryPickerModalContent from "../CategoryPicker/CategoryPickerModalContent";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  category: Category | null;
  parentCategory: Category | null;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  categories: Category[];
  loading: boolean;
}

function NewCategory({
  onClose,
  isOpen,
  category,
  parentCategory,
  addCategory,
  updateCategory,
  categories,
  loading,
}: Props) {
  const [name, setName] = useState(category ? category.name : "");
  const [color, setColor] = useState(category ? category.color : null);
  const [ignoreInSummaries, setIgnoreInSummaries] = useState(
    category ? category.ignore : false
  );
  const [newParentCategory, setNewParentCategory] = useState(parentCategory);
  useEffect(
    () => setNewParentCategory(parentCategory),
    [parentCategory, setNewParentCategory]
  );

  const [nameError, setNameError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);

  const [parentCategoryBeingEdited, setParentCategoryBeingEdited] =
    useState(false);

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
        parentId: newParentCategory?.id ?? null,
      });
    } else {
      addCategory({
        id: -1,
        name: name,
        parentId: newParentCategory?.id ?? null,
        color: color,
        ignore: ignoreInSummaries,
      });
    }

    onClose();
    setName(category ? name : "");
    setColor(category ? color : null);
    setIgnoreInSummaries(category ? ignoreInSummaries : false);
    setNewParentCategory(parentCategory);
  }, [
    name,
    color,
    category,
    onClose,
    ignoreInSummaries,
    parentCategory,
    updateCategory,
    newParentCategory?.id,
    addCategory,
  ]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        {parentCategoryBeingEdited ? (
          <CategoryPickerModalContent
            categories={categories}
            loading={loading}
            onSelect={(category) => {
              setNewParentCategory(category);
              setParentCategoryBeingEdited(false);
            }}
            onCancel={() => {
              setParentCategoryBeingEdited(false);
            }}
          />
        ) : (
          <>
            <ModalHeader>
              {category ? "Edit category" : "New category"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="left">
                <Text fontSize="sm">Name</Text>
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

                <Text fontSize="sm">Color</Text>
                <ColorPicker
                  value={color}
                  onChange={(color) => {
                    setColor(color);
                    setColorError(null);
                  }}
                  error={colorError}
                />
                <Divider />
                <Text fontSize="sm">Parent category</Text>
                <HStack justify="space-between">
                  <HStack>
                    <CategoryIcon
                      color={newParentCategory?.color ?? "lightgray"}
                      size="sm"
                    />
                    <Text fontWeight="semibold">
                      {newParentCategory?.name ?? "No category"}
                    </Text>
                  </HStack>
                  <Button
                    onClick={() => {
                      setParentCategoryBeingEdited(true);
                    }}
                  >
                    Change
                  </Button>
                </HStack>
                <Divider />
                <Text fontSize="sm">Ignore in spendings</Text>
                <Checkbox
                  isChecked={!!ignoreInSummaries}
                  onChange={(e) => setIgnoreInSummaries(e.target.checked)}
                  size="lg"
                ></Checkbox>
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

export default NewCategory;
