import HorizonalBar from "./HorizontalBar";

function Chart2() {
  return (
    <div>
      <HorizonalBar width={600} value={30000} max={30000} colorScheme="blue" />
      <HorizonalBar width={600} value={-15000} max={30000} colorScheme="red" />
      <HorizonalBar width={600} value={15000} max={30000} colorScheme="blue" />
    </div>
  );
}

export default Chart2;
