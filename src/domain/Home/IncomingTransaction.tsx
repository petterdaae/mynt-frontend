import { Badge, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { formatCurrency } from "../utils";
import { useMemo, memo } from "react";
import { Account } from "../../types";
import UncategorizedIcon from "../Icons/UncategorizedIcon";
import IncomingTransaction from "../../types/IncomingTransaction";

interface Props {
  transaction: IncomingTransaction;
  account: Account;
}

function Transaction({ transaction }: Props) {
  const formattedCurrency = useMemo(
    () => formatCurrency(transaction.amount),
    [transaction]
  );

  return (
    <>
      <HStack justify="space-between">
        <HStack>
          <UncategorizedIcon color={"lightgray"} size="sm" />
          <VStack align="left">
            <Text color="gray">{transaction.text}</Text>
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
