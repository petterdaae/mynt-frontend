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
import NewCategory from "./NewBudget";

function Category({
  category,
  setCurrentCategory,
  deleteCategory,
  addCategory,
  updateCategory,
}) {
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
          <CategoryIcon color={category.color} />
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
        edit={true}
        category={category}
        parentCategory={category.parentId}
        addCategory={addCategory}
        updateCategory={updateCategory}
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

Category.propTypes = {
  category: PropTypes.object.isRequired,
  setCurrentCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

export default Category;
