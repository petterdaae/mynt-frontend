import {
  HStack,
  Text,
  VStack,
  IconButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import PropTypes from "prop-types";
import { useEffect } from "react";

function Categorizations({
  setCategorizationBeingEdited,
  newCategorizations,
  setNewCategorizations,
  categorizationsError,
  setCategorizationsError,
  transaction,
}) {
  useEffect(() => {
    const allHaveCategories = newCategorizations.every(
      (categorization) => categorization.category.id != null
    );
    const allHaveAmounts = newCategorizations.every(
      (categorization) => categorization.amount !== ""
    );
    const equalsAmount =
      newCategorizations.reduce((acc, curr) => acc + curr.amount, 0) ===
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
  }, [newCategorizations]);

  return (
    <VStack align="left">
      <Text fontSize="sm">Categorizations</Text>
      {newCategorizations.length === 0 ? (
        <HStack>
          <Text>No categorizations</Text>
        </HStack>
      ) : (
        newCategorizations.map((categorization) => (
          <HStack justify="space-between" key={categorization.id}>
            <HStack>
              <CategoryIcon color={categorization.category.color} size="sm" />
              <Text fontWeight="semibold">{categorization.category.name}</Text>
            </HStack>
            <HStack align="right">
              <Input
                type="number"
                step="0.01"
                value={
                  categorization.amount === ""
                    ? ""
                    : categorization.amount / 100
                }
                onChange={(e) => {
                  setNewCategorizations((prev) => {
                    return prev.map((c) =>
                      c.id === categorization.id
                        ? { ...c, amount: e.target.value * 100 }
                        : c
                    );
                  });
                }}
              />
              <IconButton
                aria-label="Edit category"
                icon={<EditIcon />}
                onClick={() => setCategorizationBeingEdited(categorization.id)}
              />
            </HStack>
          </HStack>
        ))
      )}
      <Button
        onClick={() => {
          setNewCategorizations((prev) => {
            return [
              ...prev,
              {
                id: Math.max(...prev.map((c) => c.id)) + 1,
                category: {
                  id: null,
                  name: "No category",
                  color: "lightgray",
                },
                amount: "",
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

Categorizations.propTypes = {
  setCategorizationBeingEdited: PropTypes.func.isRequired,
  newCategorizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNewCategorizations: PropTypes.func.isRequired,
  categorizationsError: PropTypes.string,
  setCategorizationsError: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

export default Categorizations;
