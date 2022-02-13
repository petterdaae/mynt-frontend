import {
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Category } from "../../types";
import CategoryPicker from "./CategoryPicker";

interface Props {
  categories: Category[];
  loading: boolean;
  onSelect: (category: Category) => void;
  onCancel: () => void;
}

function CategoryPickerModalContent({
  categories,
  loading,
  onSelect,
  onCancel,
}: Props) {
  return (
    <>
      <ModalHeader>Choose a category</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CategoryPicker
          onSelect={onSelect}
          categories={categories}
          loading={loading}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancel}>Cancel</Button>
      </ModalFooter>
    </>
  );
}

export default CategoryPickerModalContent;
