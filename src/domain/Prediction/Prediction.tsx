import { useAccountPrediction } from "../../hooks";
import { Center } from "@chakra-ui/react";
import Chart2 from "./Chart2";

function Prediction() {
  const { predictions } = useAccountPrediction();
  return (
    <Center>
      <Chart2 predictions={predictions} />
    </Center>
  );
}

export default Prediction;
