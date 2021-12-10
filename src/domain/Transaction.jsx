import { Avatar, Badge, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { formatCurrency, formatReadableDate } from "./transactionListUtils";
import Proptypes from "prop-types";

function Transaction({ transaction }) {
  return (
    <HStack
      justify="space-between"
      m="4px"
      p="4px"
      borderRadius="md"
      _hover={{ background: "whitesmoke", cursor: "pointer" }}
    >
      <HStack>
        <Avatar
          bg={transaction.categoryColor}
          icon={
            <ViewIcon fontSize="1.5rem" color={transaction.categoryColor} />
          }
        />
        <VStack align="left" spacing="1px">
          <Text fontSize="sm">
            {formatReadableDate(transaction.accountingDate)}
          </Text>
          <Text fontWeight="bold">{transaction.text}</Text>
          <Text fontSize="sm">{transaction.accountName}</Text>
        </VStack>
      </HStack>
      <Box>
        <Badge
          colorScheme={transaction.amount >= 0 ? "green" : "red"}
          fontSize="1.0em"
        >
          {formatCurrency(transaction.amount)}
        </Badge>
      </Box>
    </HStack>
  );
}

Transaction.propTypes = {
  transaction: Proptypes.object.isRequired,
};

export default Transaction;
