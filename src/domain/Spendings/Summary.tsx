import { Center, HStack, VStack } from "@chakra-ui/react";
import Bar from "./Bar";
import { Spending } from "../../types";
import DoubleBar from "./DoubleBar";

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
    remainingPositiveBudget: 0,
    remainingNegativeBudget: 0,
  };
  const max = Math.max(
    spending.positiveAmount,
    -spending.negativeAmount,
    spending.positiveBudget,
    -spending.negativeBudget,
    spending.positiveAmount + spending.remainingPositiveBudget,
    -spending.negativeAmount - spending.remainingNegativeBudget
  );
  return (
    <Center m="2">
      <VStack>
        <HStack alignItems="end">
          {max !== 0 && (
            <>
              <Bar
                max={max}
                height={200}
                width={85}
                value={-spending.negativeBudget}
                colorScheme="gray"
              />
              <DoubleBar
                max={max}
                height={200}
                width={85}
                value1={-spending.negativeAmount}
                value2={
                  -spending.negativeAmount - spending.remainingNegativeBudget
                }
                colorScheme1="red"
                colorScheme2="red"
              />
              <DoubleBar
                max={max}
                height={200}
                width={85}
                value1={spending.positiveAmount}
                value2={
                  spending.positiveAmount + spending.remainingPositiveBudget
                }
                colorScheme1="blue"
                colorScheme2="blue"
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
