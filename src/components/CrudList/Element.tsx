import {
  HStack,
  Text,
  Button,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NewElement from "./NewElement";
import IElement from "./IElement";
import ResponsiveModal from "../ResponsiveModal";
import ResponsiveModalContent from "../ResponsiveModalContent";

interface Props<T> {
  element: IElement<T>;
  deleteElement: (id: number) => void;
  createElement: (element: IElement<T>) => void;
  updateElement: (element: IElement<T>) => void;
  initialElement: IElement<T>;
}

function Element<T>({
  element,
  deleteElement,
  createElement,
  updateElement,
  initialElement,
}: Props<T>) {
  const [editElementOpen, setEditElementOpen] = useState(false);
  const [showDeleteElement, setShowDeleteElement] = useState(false);
  return (
    <>
      <HStack
        justify="space-between"
        m="4px"
        p="4px"
        borderRadius="md"
        _hover={{ background: "whitesmoke", cursor: "pointer" }}
        onClick={() => {}}
      >
        <Text>{element.name}</Text>
        <HStack>
          <IconButton
            aria-label="Edit element"
            icon={<EditIcon />}
            onClick={(e) => {
              setEditElementOpen(true);
              e.stopPropagation();
            }}
          />
          <IconButton
            aria-label="Delete category"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={(e) => {
              setShowDeleteElement(true);
              e.stopPropagation();
            }}
          />
        </HStack>
      </HStack>
      <NewElement
        isOpen={editElementOpen}
        onClose={() => setEditElementOpen(false)}
        element={element}
        createElement={createElement}
        updateElement={updateElement}
        initialElement={initialElement}
      />
      <ResponsiveModal
        isOpen={showDeleteElement}
        onClose={() => setShowDeleteElement(false)}
      >
        <ModalOverlay bg="white" />
        <ResponsiveModalContent>
          <ModalHeader>Delete element</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this element?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteElement(element.id);
                setShowDeleteElement(false);
              }}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setShowDeleteElement(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </>
  );
}

export default Element;
