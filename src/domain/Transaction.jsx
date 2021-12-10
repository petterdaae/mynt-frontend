import { Avatar, Badge, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { formatCurrency } from "./transactionListUtils";
import Proptypes from "prop-types";

function Transaction({ transaction }) {
  return (
    <HStack justify="space-between" mt="4px" mb="4px">
      <HStack>
        <Avatar
          bg={transaction.category_color}
          icon={<QuestionOutlineIcon fontSize="1.5rem" />}
        />
        <VStack align="left" spacing="1px">
          <Text fontSize="sm">{transaction.date}</Text>
          <Text fontWeight="bold">{transaction.text}</Text>
          <Text fontSize="sm">{transaction.account}</Text>
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
