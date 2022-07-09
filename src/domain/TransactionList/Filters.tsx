import { memo } from "react";
import { HStack, Select } from "@chakra-ui/react";

interface Props {
  monthsBack: number;
  setMonthsBack: (monthsBack: number) => void;
}

function Filters({ monthsBack, setMonthsBack }: Props) {
  return (
    <HStack spacing="16px" ml="2" mr="2">
      <Select
        value={monthsBack}
        onChange={(e) => {
          setMonthsBack(parseInt(e.target.value));
        }}
      >
        <option value={1}>Last 30 days</option>
        <option value={2}>Last 60 days</option>
        <option value={12}>Last year</option>
        <option value={1000}>All time</option>
      </Select>
    </HStack>
  );
}

export default memo(Filters);
