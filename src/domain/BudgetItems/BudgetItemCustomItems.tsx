import { HStack, Text, Button, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { SetState } from "../../types";
import BudgetItemCustomItem from "../../types/BudgetItemCustomItem";
import CurrencyInput from "../../components/CurrencyInput";
import DateInput from "../../components/DateInput";

interface Props {
  customItems: BudgetItemCustomItem[];
  setCustomItems: SetState<BudgetItemCustomItem[]>;
}

function BudgetItemCustomItems({ customItems, setCustomItems }: Props) {
  return (
    <>
      <Text>Custom items</Text>
      {customItems.map((item) => (
        <HStack key={item.id}>
          <CurrencyInput
            value={item.amount}
            setValue={(newValue) =>
              setCustomItems((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, amount: newValue } : i
                )
              )
            }
          />
          <DateInput
            value={item.date}
            setValue={(newValue) =>
              setCustomItems((prev) =>
                prev.map((i) =>
                  i.id === item.id ? { ...i, date: newValue } : i
                )
              )
            }
          />
          <IconButton
            aria-label="Delete budgetitemcustomitem"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() =>
              setCustomItems((prev) => prev.filter((i) => i.id !== item.id))
            }
          />
        </HStack>
      ))}
      <Button
        colorScheme="green"
        onClick={() => {
          setCustomItems((prev) => {
            return [
              ...prev,
              {
                id:
                  prev.length === 0
                    ? 1
                    : Math.max(...prev.map((e) => e.id)) + 1,
                amount: null,
                date: new Date().toISOString().split("T")[0],
              },
            ];
          });
        }}
      >
        Add item
      </Button>
    </>
  );
}

export default BudgetItemCustomItems;
