import {
  VStack,
  HStack,
  Text,
  Checkbox,
  Input,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

function Date({ transaction }) {
  const [customDateOpen, setCustomDateOpen] = useState(transaction.customDate);
  const [customDate, setCustomDate] = useState(
    transaction.customDate
      ? transaction.customDate
      : transaction.accountingDate.split("T")[0]
  );
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
        <HStack>
          <Button variant="outline">-1 month</Button>
          <Input
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
          />
          <Button variant="outline">+1 month</Button>
        </HStack>
      )}
    </VStack>
  );
}

Date.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default Date;
