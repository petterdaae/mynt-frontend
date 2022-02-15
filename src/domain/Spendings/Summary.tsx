import { Center, HStack, VStack } from "@chakra-ui/react";
import Bar from "./Bar";
import { Spending } from "../../types";

interface Props {
  currentCategory: number | null;
  spendings: Spending[];
}

function Summary({ currentCategory, spendings }: Props) {
  const spending = spendings.find(
    (s) => (s.category?.id ?? null) === currentCategory
  ) ?? {
    amount: 0,
    positiveAmount: 0,
    negativeAmount: 0,
    positiveBudget: 0,
    negativeBudget: 0,
  };
  const max = Math.max(
    spending.positiveAmount,
    -spending.negativeAmount,
    spending.positiveBudget,
    -spending.negativeBudget
  );
  return (
    <Center m="2">
      <VStack>
        <HStack>
          {max !== 0 && (
            <>
              <Bar
                max={max}
                height={200}
                width={85}
                value={-spending.negativeBudget}
                colorScheme="gray"
              />
              <Bar
                max={max}
                height={200}
                width={85}
                value={-spending.negativeAmount}
                colorScheme="red"
              />
              <Bar
                max={max}
                height={200}
                width={85}
                value={spending.positiveAmount}
                colorScheme="blue"
              />
              <Bar
                max={max}
                height={200}
                width={85}
                value={spending.positiveBudget}
                colorScheme="gray"
              />
            </>
          )}
        </HStack>
      </VStack>
    </Center>
  );
}

export default Summary;
