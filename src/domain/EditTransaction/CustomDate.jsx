import {
  VStack,
  HStack,
  Text,
  Checkbox,
  Input,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useCallback } from "react";

const dateRegex =
  /^([0-9]{4}|[0-9]{2})[./-]([0][1-9]|[1][0-2])[./-]([0][1-9]|[1|2][0-9]|[3][0|1])$/;

function CustomDate({
  transaction,
  customDate,
  setCustomDate,
  error,
  setError,
  customDateOpen,
  setCustomDateOpen,
}) {
  const onChangeCustomDate = useCallback((e) => {
    const newDate = e.target.value.trim();
    setCustomDate(newDate);
    if (dateRegex.test(newDate)) {
      setError(null);
    } else {
      setError("Invalid date format (must be on the format YYYY-MM-DD)");
    }
  });

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
          <Checkbox
            isChecked={customDateOpen}
            onChange={(e) => setCustomDateOpen((prev) => !prev)}
          >
            Set a custom date
          </Checkbox>
        </HStack>
      </VStack>
      {customDateOpen && (
        <VStack align="left">
          <HStack>
            <Button variant="outline" disabled={error} onClick={decreaseMonth}>
              -1 month
            </Button>
            <Input value={customDate} onChange={onChangeCustomDate} />
            <Button variant="outline" disabled={error} onClick={increaseMonth}>
              +1 month
            </Button>
          </HStack>
          <Text color="red.500">{error}</Text>
        </VStack>
      )}
    </VStack>
  );
}

CustomDate.propTypes = {
  transaction: PropTypes.object.isRequired,
  customDate: PropTypes.string.isRequired,
  setCustomDate: PropTypes.func.isRequired,
  error: PropTypes.string,
  setError: PropTypes.func,
  customDateOpen: PropTypes.bool,
  setCustomDateOpen: PropTypes.func,
};

export default CustomDate;
