import { Badge, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { formatCurrency, formatReadableDate } from "./transactionListUtils";
import Proptypes from "prop-types";
import EditTransactionModal from "./EditTransaction/EditTransactionModal";
import CategoryIcon from "./CategoryIcon";
import { useState } from "react";

function Transaction({ transaction }) {
  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState(false);
  return (
    <>
      <HStack
        justify="space-between"
        m="4px"
        p="4px"
        borderRadius="md"
        _hover={{ background: "whitesmoke", cursor: "pointer" }}
        onClick={() => setShowEditTransactionModal(true)}
      >
        <HStack>
          <CategoryIcon color={transaction.categoryColor} />
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
      <EditTransactionModal
        transaction={transaction}
        isOpen={showEditTransactionModal}
        onClose={() => setShowEditTransactionModal(false)}
      />
    </>
  );
}

Transaction.propTypes = {
  transaction: Proptypes.object.isRequired,
};

export default Transaction;
