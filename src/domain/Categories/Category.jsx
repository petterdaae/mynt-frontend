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
} from "@chakra-ui/react";
import { useState } from "react";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import PropTypes from "prop-types";
import NewCategory from "./NewCategory";
import { useCategories } from "../../hooks/domain/useCategories";

function Category({ category, setCurrentCategory }) {
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const { deleteCategory } = useCategories();
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
          <Button
            onClick={(e) => {
              setEditCategoryOpen(true);
              e.stopPropagation();
            }}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            onClick={(e) => {
              setShowDeleteCategory(true);
              e.stopPropagation();
            }}
          >
            Delete
          </Button>
        </HStack>
      </HStack>
      <NewCategory
        isOpen={editCategoryOpen}
        onClose={() => setEditCategoryOpen(false)}
        edit={true}
        category={category}
        parentCategory={category.parent_id}
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
              variantColor="red"
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
};

export default Category;
