import { VStack, HStack, Text, Input, Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { Transaction, SetState } from "../../types";

const dateRegex =
  /^([0-9]{4}|[0-9]{2})[./-]([0][1-9]|[1][0-2])[./-]([0][1-9]|[1|2][0-9]|[3][0|1])$/;

interface Props {
  transaction: Transaction;
  customDate: string;
  setCustomDate: SetState<string>;
  error: string | null;
  setError: SetState<string | null>;
  customDateOpen: boolean;
}

function CustomDate({
  transaction,
  customDate,
  setCustomDate,
  error,
  setError,
  customDateOpen,
}: Props) {
  const onChangeCustomDate = useCallback(
    (e) => {
      const newDate = e.target.value.trim();
      setCustomDate(newDate);
      if (dateRegex.test(newDate)) {
        setError(null);
      } else {
        setError("Invalid date format (must be on the format YYYY-MM-DD)");
      }
    },
    [setCustomDate, setError]
  );

  const increaseMonth = useCallback(() => {
    setCustomDate((prevCustomDate) => {
      const newDate = new Date(prevCustomDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate.toISOString().split("T")[0];
    });
  }, [setCustomDate]);

  const decreaseMonth = useCallback(() => {
    setCustomDate((prevCustomDate) => {
      const newDate = new Date(prevCustomDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate.toISOString().split("T")[0];
    });
  }, [setCustomDate]);

  return (
    <VStack align="left">
      <VStack align="left">
        <HStack justify="space-between">
          <VStack align="left">
            <Text fontSize="sm">Date</Text>
            <Text fontWeight="semibold">
              {transaction.accountingDate.split("T")[0]}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      {customDateOpen && (
        <VStack align="left">
          <HStack>
            <Button
              variant="outline"
              disabled={!!error}
              onClick={decreaseMonth}
            >
              -
            </Button>
            <Input value={customDate} onChange={onChangeCustomDate} />
            <Button
              variant="outline"
              disabled={!!error}
              onClick={increaseMonth}
            >
              +
            </Button>
          </HStack>
          <Text color="red.500">{error}</Text>
        </VStack>
      )}
    </VStack>
  );
}

export default CustomDate;
