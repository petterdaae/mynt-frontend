import { Badge, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { formatCurrency, formatReadableDate } from "../utils";
import { useMemo, memo } from "react";
import { Account } from "../../types";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import IncomingTransaction from "../../types/IncomingTransaction";

interface Props {
  transaction: IncomingTransaction;
  account: Account;
}

function Transaction({ transaction, account }: Props) {
  const formattedCurrency = useMemo(
    () => formatCurrency(transaction.amount),
    [transaction]
  );

  const readableAccountingDate = useMemo(
    () => formatReadableDate(transaction.accountingDate),
    [transaction]
  );

  return (
    <>
      <HStack
        justify="space-between"
        m="4px"
        p="4px"
        borderRadius="md"
        _hover={{ background: "whitesmoke", cursor: "pointer" }}
      >
        <HStack>
          <CategoryIcon color={"lightgray"} size="md" />
          <VStack align="left" spacing="1px">
            <Text fontSize="sm">{readableAccountingDate}</Text>
            <Text fontWeight="bold">{transaction.text}</Text>
            <Text fontSize="sm">{account.name}</Text>
          </VStack>
        </HStack>
        <Box>
          <Badge
            colorScheme={transaction.amount >= 0 ? "blue" : "red"}
            fontSize="1.0em"
          >
            {formattedCurrency}
          </Badge>
        </Box>
      </HStack>
    </>
  );
}

export default memo(Transaction);
