import {
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Category, EditableCategorization, SetState } from "../../types";
import CategoryPicker from "../CategoryPicker/CategoryPicker";

interface Props {
  setCategorizationBeingEdited: (id: number | null) => void;
  categorizationBeingEdited: number | null;
  setCategorizations: SetState<EditableCategorization[]>;
  categories: Category[];
  loading: boolean;
}

function CategoryPickerModalContent({
  setCategorizationBeingEdited,
  categorizationBeingEdited,
  setCategorizations,
  categories,
  loading,
}: Props) {
  return (
    <>
      <ModalHeader>Choose a category</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CategoryPicker
          onSelect={(newCategory) => {
            setCategorizationBeingEdited(null);
            setCategorizations((p) =>
              p.map((c) =>
                c.id === categorizationBeingEdited
                  ? {
                      ...c,
                      category: newCategory,
                      categoryId: newCategory?.id ?? null,
                    }
                  : c
              )
            );
          }}
          categories={categories}
          loading={loading}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setCategorizationBeingEdited(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
}

export default CategoryPickerModalContent;
