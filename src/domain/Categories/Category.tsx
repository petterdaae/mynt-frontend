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
import NewCategory from "./NewCategory";
import {
  Category as CategoryType,
  DraftCategory as DraftCategoryType,
} from "../../types";

interface Props {
  category: CategoryType;
  parentCategory: CategoryType | null;
  setCurrentCategory: (categoryId: number | null) => void;
  deleteCategory: (categoryId: number) => void;
  addCategory: (category: DraftCategoryType) => void;
  updateCategory: (id: number, category: DraftCategoryType) => void;
  categories: CategoryType[];
  loading: boolean;
}

function Category({
  category,
  categories,
  loading,
  parentCategory,
  setCurrentCategory,
  deleteCategory,
  addCategory,
  updateCategory,
}: Props) {
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  return (
    <>
      <HStack
        justify="space-between"
        m="4px"
        p="4px"
        borderRadius="md"
        _hover={{ background: "whitesmoke", cursor: "pointer" }}
        onClick={() => setCurrentCategory(category.id)}
      >
        <HStack>
          <CategoryIcon color={category.color} size="md" />
          <Text>{category.name}</Text>
        </HStack>
        <HStack>
          <IconButton
            aria-label="Edit category"
            icon={<EditIcon />}
            onClick={(e) => {
              setEditCategoryOpen(true);
              e.stopPropagation();
            }}
          />
          <IconButton
            aria-label="Delete category"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={(e) => {
              setShowDeleteCategory(true);
              e.stopPropagation();
            }}
          />
        </HStack>
      </HStack>
      <NewCategory
        isOpen={editCategoryOpen}
        onClose={() => setEditCategoryOpen(false)}
        category={category}
        parentCategory={parentCategory}
        addCategory={addCategory}
        updateCategory={updateCategory}
        categories={categories}
        loading={loading}
      />
      <Modal
        isOpen={showDeleteCategory}
        onClose={() => setShowDeleteCategory(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this category?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteCategory(category.id);
                setShowDeleteCategory(false);
              }}
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowDeleteCategory(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Category;
