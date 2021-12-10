import { HStack, Checkbox, Divider, Select } from "@chakra-ui/react";
import TransactionList from "./TransactionList";

function TransactionListWithFilters() {
  return (
    <>
      <HStack spacing="16px">
        <Select>
          <option value={1}>Last 30 days</option>
          <option value={2}>Last 60 days</option>
          <option value={12}>Last year</option>
          <option value={1000}>All time</option>
        </Select>
        <Checkbox size="lg">Uncategorized</Checkbox>
      </HStack>
      <Divider mt="8px" mb="8px" />
      <TransactionList />
    </>
  );
}

export default TransactionListWithFilters;
