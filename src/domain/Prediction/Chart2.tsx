import { monthNameFromIndex } from "../utils";
import HorizonalBar from "./HorizontalBar";
import { Divider, Text } from "@chakra-ui/react";

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
  return (
    <div>
      {predictions.map((prediction) => {
        return (
          <div key={prediction.month}>
            <Text>{monthNameFromIndex(prediction.month - 1)}</Text>
            <Divider m="2" />
            <HorizonalBar
              width={600}
              value={prediction.initialAmount}
              max={max}
              colorScheme={prediction.initialAmount < 0 ? "red" : "blue"}
            />
            <HorizonalBar
              width={600}
              value={prediction.amountAfterExpenses}
              max={max}
              colorScheme={prediction.amountAfterExpenses < 0 ? "red" : "blue"}
            />
            <HorizonalBar
              width={600}
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
