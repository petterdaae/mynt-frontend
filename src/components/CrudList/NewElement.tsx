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
  Text,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import IElement from "./IElement";

interface Props<T> {
  onClose: () => void;
  isOpen: boolean;
  element: IElement<T> | null;
  createElement: (element: IElement<T>) => void;
  updateElement: (element: IElement<T>) => void;
  initialElement: IElement<T>;
}

function NewElement<T>({
  onClose,
  isOpen,
  element,
  createElement,
  updateElement,
  initialElement,
}: Props<T>) {
  const [name, setName] = useState(
    element ? element.name : initialElement.name
  );
  const [nameError, setNameError] = useState<string | null>(null);

  const [fields, setFields] = useState<T>(
    element ? element.fields : initialElement.fields
  );
  const [fieldsErrors, setFieldsErrors] = useState<{
    [key: string]: string | null;
  }>({});

  const keys = useMemo(() => {
    let key: keyof typeof fields;
    const keys: typeof key[] = [];
    for (key in fields) {
      keys.push(key);
    }
    return keys;
  }, [fields]);

  const onSave = useCallback(() => {
    const nameInvalid = name.trim().length === 0;

    let fieldsInvalid = false;
    for (const key of keys) {
      const value = fields[key] as unknown as string;
      if (value.trim().length === 0) {
        setFieldsErrors((p) => ({ ...p, [key]: "Has to be non-empty" }));
        fieldsInvalid = true;
      }
    }

    if (nameInvalid) {
      setNameError("Name is required");
    }

    if (nameInvalid || fieldsInvalid) {
      return;
    }

    if (element) {
      updateElement({
        ...element,
        name: name,
        fields: fields,
      });
    } else {
      createElement({
        id: 0,
        name: name,
        fields: fields,
      });
    }

    onClose();
    setName(element ? name : "");
    setFields(element ? fields : initialElement.fields);
  }, [
    name,
    element,
    onClose,
    fields,
    initialElement,
    keys,
    updateElement,
    createElement,
  ]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{element ? "Edit element" : "New element"}</ModalHeader>
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
            {keys.map((key) => {
              if (typeof fields[key] !== "string") {
                return <></>;
              }

              const stringKey = key as string;
              const value = fields[key] as unknown as string;

              return (
                <div key={stringKey}>
                  <Input
                    value={value}
                    onChange={(e) => {
                      setFields((p) => ({
                        ...p,
                        [key]: e.target.value,
                      }));
                      setFieldsErrors((p) => ({ ...p, [key]: null }));
                    }}
                    placeholder={stringKey}
                    isInvalid={!!fieldsErrors[stringKey]}
                  />
                  {fieldsErrors[stringKey] && (
                    <Text color="crimson" fontSize="sm">
                      {fieldsErrors[stringKey]}
                    </Text>
                  )}
                  <Divider />
                </div>
              );
            })}
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

export default NewElement;
