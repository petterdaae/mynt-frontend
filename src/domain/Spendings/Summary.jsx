import PropTypes from "prop-types";
import { Center, HStack, VStack } from "@chakra-ui/react";
import Bar from "./Bar";

function Summary({ currentCategory, spendings }) {
  const spending = spendings.find((s) => s.category.id === currentCategory) ?? {
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
    spending.negativeBudget
  );
  console.log(spending);
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
                actual={-spending.negativeAmount}
                budget={spending.negativeBudget}
              />
              <Bar
                max={max}
                height={200}
                width={85}
                actual={spending.positiveAmount}
                budget={spending.positiveBudget}
                isIncome
              />
            </>
          )}
        </HStack>
      </VStack>
    </Center>
  );
}

Summary.propTypes = {
  currentCategory: PropTypes.number,
  spendings: PropTypes.array,
};

export default Summary;
