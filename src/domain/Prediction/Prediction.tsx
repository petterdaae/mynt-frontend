import { useAccountPrediction } from "../../hooks";
import { formatCurrency } from "../utils";

function Prediction() {
  const { predictions } = useAccountPrediction();
  return (
    <>
      {predictions.map((prediction) => (
        <div key={prediction.month}>
          {prediction.month}: {formatCurrency(prediction.amount)}
        </div>
      ))}
    </>
  );
}

export default Prediction;
