import { monthNameFromIndex } from "../utils";
import HorizonalBar from "./HorizontalBar";
import { Center, Divider, Text } from "@chakra-ui/react";

interface Prediction {
  month: number;
  initialAmount: number;
  amountAfterExpenses: number;
  finalAmount: number;
}

interface Props {
  predictions: Prediction[];
}

function Chart2({ predictions }: Props) {
  const max = Math.max(
    ...predictions.map((p) =>
      Math.max(
        ...[p.initialAmount, p.amountAfterExpenses, p.finalAmount].map(Math.abs)
      )
    )
  );
  const width = 300;
  return (
    <div>
      {predictions.map((prediction) => {
        return (
          <div key={prediction.month}>
            <Center>
              <Text fontSize="sm">
                {monthNameFromIndex(prediction.month - 1)}
              </Text>
            </Center>
            <HorizonalBar
              width={width}
              value={prediction.initialAmount}
              max={max}
              colorScheme={prediction.initialAmount < 0 ? "red" : "blue"}
            />
            <HorizonalBar
              width={width}
              value={prediction.amountAfterExpenses}
              max={max}
              colorScheme={prediction.amountAfterExpenses < 0 ? "red" : "blue"}
            />
            <HorizonalBar
              width={width}
              value={prediction.finalAmount}
              max={max}
              colorScheme={prediction.finalAmount < 0 ? "red" : "blue"}
            />
            <Divider m="2" />
          </div>
        );
      })}
    </div>
  );
}

export default Chart2;
