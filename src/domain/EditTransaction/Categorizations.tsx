import { HStack, Text, VStack, IconButton, Button } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CategoryIcon from "../Icons/CategoryIcon";
import { useEffect } from "react";
import { Transaction, SetState, EditableCategorization } from "../../types";
import CurrencyInput from "../../components/CurrencyInput";

interface Props {
  setCategorizationBeingEdited: (id: number | null) => void;
  categorizations: EditableCategorization[];
  setCategorizations: SetState<EditableCategorization[]>;
  categorizationsError: string | null;
  setCategorizationsError: (error: string | null) => void;
  transaction: Transaction;
}

function Categorizations({
  setCategorizationBeingEdited,
  categorizations,
  setCategorizations,
  categorizationsError,
  setCategorizationsError,
  transaction,
}: Props) {
  useEffect(() => {
    if (categorizations.length === 0) {
      setCategorizationsError(null);
      return;
    }

    const allHaveCategories = categorizations.every((c) => c.category !== null);
    const allHaveAmounts = categorizations.every((c) => c.amount !== null);
    const equalsAmount =
      categorizations.reduce((a, c) => a + (c.amount ?? 0), 0) ===
      transaction.amount;

    if (!allHaveCategories) {
      setCategorizationsError("All categorizations must have a category.");
    } else if (!allHaveAmounts) {
      setCategorizationsError("All categorizations must have an amount.");
    } else if (!equalsAmount) {
      setCategorizationsError(
        "The sum of all categorizations must equal the transaction amount."
      );
    } else {
      setCategorizationsError(null);
    }
  }, [categorizations, setCategorizationsError, transaction.amount]);

  return (
    <VStack align="left">
      <Text fontSize="sm" fontWeight="semibold">
        Categorizations
      </Text>
      {categorizations.length === 0 ? (
        <HStack>
          <Text>No categorizations</Text>
        </HStack>
      ) : (
        categorizations.map((categorization) => (
          <HStack justify="space-between" key={categorization.id}>
            <HStack>
              <CategoryIcon
                color={categorization.category?.color ?? "lightgray"}
                size="sm"
              />
              <Text>{categorization.category?.name ?? "No category"}</Text>
            </HStack>
            <HStack align="right">
              <CurrencyInput
                value={categorization.amount}
                setValue={(newAmount) => {
                  setCategorizations((prev) =>
                    prev.map((c) =>
                      c.id === categorization.id
                        ? { ...c, amount: newAmount }
                        : c
                    )
                  );
                }}
              />
              <IconButton
                aria-label="Edit category"
                icon={<EditIcon />}
                onClick={() => setCategorizationBeingEdited(categorization.id)}
              />
              <IconButton
                aria-label="Delete category"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() =>
                  setCategorizations((prev) =>
                    prev.filter((c) => c.id !== categorization.id)
                  )
                }
              />
            </HStack>
          </HStack>
        ))
      )}
      <Button
        onClick={() => {
          setCategorizations((prev) => {
            const temporaryId =
              prev.length === 0 ? 1 : Math.max(...prev.map((c) => c.id)) + 1;
            return [
              ...prev,
              {
                id: temporaryId,
                transactionId: transaction.id,
                amount: prev.length === 0 ? transaction.amount : null,
                category: null,
              },
            ];
          });
        }}
      >
        Add categorization
      </Button>
      <Text color="red" fontSize="sm">
        {categorizationsError}
      </Text>
    </VStack>
  );
}

export default Categorizations;
