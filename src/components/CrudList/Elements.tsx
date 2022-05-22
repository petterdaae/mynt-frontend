import { useState } from "react";
import { Divider, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import NewElement from "./NewElement";
import Element from "./Element";
import IElement from "./IElement";

interface Props<T> {
  useElements: () => {
    elements: IElement<T>[];
    deleteElement: (id: string) => void;
    createElement: (element: IElement<T>) => void;
    updateElement: (element: IElement<T>) => void;
    loading: boolean;
  };
  initialElement: IElement<T>;
}

function Elements<T>({ useElements, initialElement }: Props<T>) {
  const { elements, deleteElement, createElement, updateElement, loading } =
    useElements();
  const [newElementOpen, setNewElementOpen] = useState(false);
  return (
    <>
      <HStack justify="space-between" m="2">
        <IconButton
          aria-label="New category"
          icon={<AddIcon />}
          colorScheme="green"
          onClick={() => setNewElementOpen(true)}
        />
      </HStack>
      <Divider />
      {!loading &&
        elements.map((element) => {
          return (
            <div key={element.id}>
              <Element
                element={element}
                deleteElement={deleteElement}
                createElement={createElement}
                updateElement={updateElement}
                initialElement={initialElement}
              />
              <Divider />
            </div>
          );
        })}
      <NewElement
        element={null}
        isOpen={newElementOpen}
        onClose={() => setNewElementOpen(false)}
        createElement={createElement}
        updateElement={updateElement}
        initialElement={initialElement}
      />
    </>
  );
}

export default Elements;
