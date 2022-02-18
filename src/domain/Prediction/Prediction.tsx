import { useAccountPrediction } from "../../hooks";
import { formatCurrency, monthNameFromIndex } from "../utils";
import Chart from "./Chart";
import {
  Center,
  Thead,
  VStack,
  Table,
  Th,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import Chart2 from "./Chart2";

function Prediction() {
  const { predictions } = useAccountPrediction();
  return (
    <Center>
      <VStack>
        <Chart2 />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Month</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {predictions.map((prediction) => (
              <Tr key={prediction.month}>
                <Td>{monthNameFromIndex(prediction.month - 1)}</Td>
                <Td isNumeric>{formatCurrency(prediction.amount)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Chart data={predictions} />
        <>Hello</>
      </VStack>
    </Center>
  );
}

export default Prediction;
