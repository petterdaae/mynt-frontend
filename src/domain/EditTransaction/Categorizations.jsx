import {
  HStack,
  Text,
  VStack,
  IconButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { formatCurrency } from "../utils";

function Categorizations({
  setCategorizationBeingEdited,
  newCategorizations,
  setNewCategorizations,
  categorizationsError,
  setCategorizationsError,
  transaction,
}) {
  useEffect(() => {
    if (newCategorizations.length === 0) {
      setCategorizationsError(null);
      return;
    }

    const allHaveCategories = newCategorizations.every(
      (categorization) => categorization.category.id != null
    );
    const allHaveAmounts = newCategorizations.every(
      (categorization) => categorization.amount !== ""
    );
    const equalsAmount =
      newCategorizations.reduce((acc, curr) => {
        if (!curr.newAmount && curr.newAmount !== "") return acc + curr.amount;
        return acc + parseFloat(curr.newAmount) * 100;
      }, 0) === transaction.amount;

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
                value={
                  !categorization.newAmount && categorization.newAmount !== ""
                    ? (categorization.amount / 100).toFixed(2)
                    : categorization.newAmount === ""
                    ? ""
                    : categorization.newAmount
                }
                onChange={(e) => {
                  setNewCategorizations((prev) => {
                    const regex = /^-?\d*(\.\d{0,2})?$/g;
                    if (!regex.test(e.target.value)) {
                      return prev;
                    }

                    if (
                      prev.length === 2 &&
                      parseFloat(e.target.value).toString() !== "NaN"
                    ) {
                      const currentAmount = parseFloat(e.target.value);
                      const otherAmount =
                        transaction.amount / 100 - currentAmount;
                      return prev.map((c) =>
                        c.id === categorization.id
                          ? { ...c, newAmount: e.target.value }
                          : {
                              ...c,
                              newAmount: otherAmount.toFixed(2),
                            }
                      );
                    }

                    return prev.map((c) =>
                      c.id === categorization.id
                        ? { ...c, newAmount: e.target.value }
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
              <IconButton
                aria-label="Delete category"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() =>
                  setNewCategorizations((prev) =>
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
          setNewCategorizations((prev) => {
            return [
              ...prev,
              {
                id:
                  prev.length === 0
                    ? 1
                    : Math.max(...prev.map((c) => c.id)) + 1,
                category: {
                  id: null,
                  name: "No category",
                  color: "lightgray",
                },
                newAmount:
                  prev.length === 0
                    ? formatCurrency(transaction.amount).replace(" ", "")
                    : "",
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
