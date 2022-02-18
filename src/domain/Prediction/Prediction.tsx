import { useAccountPrediction } from "../../hooks";
import { VStack, Text, Divider } from "@chakra-ui/react";
import Chart2 from "./Chart2";

function Prediction() {
  const { predictions } = useAccountPrediction();
  return (
    <VStack m="4">
      <Text>
        Prediction of total account balance per month. The start amount is the
        sum of available on all accounts. The first row is the initial amount of
        the month, the second row is the amount after expenses and the third row
        is the amount after expenses and income. The predictions are based on
        the selected budget as well how much you have spent outside the budget
        this month.
      </Text>
      <Divider />
      <Chart2 predictions={predictions} />
    </VStack>
  );
}

export default Prediction;
