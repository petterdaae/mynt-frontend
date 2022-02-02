import PropTypes from "prop-types";
import { Center, HStack, VStack } from "@chakra-ui/react";
import Bar from "./Bar";

function Summary({ currentCategory, spendings }) {
  // const spending = spendings.find((s) => s.category.id === currentCategory) ?? {
  //   amount: 0,
  //   positiveAmount: 0,
  //   negativeAmount: 0,
  // };
  return (
    <Center m="2">
      <VStack>
        <HStack>
          <Bar
            max={23456}
            height={200}
            width={85}
            actual={19234}
            budget={23456}
          />
          <Bar
            max={23456}
            height={200}
            width={85}
            actual={9345}
            budget={8345}
            isIncome
          />
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
