import { memo } from "react";
import { HStack, Checkbox, Select } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Filters({
  monthsBack,
  setMonthsBack,
  showCategorized,
  setShowCategorized,
}) {
  return (
    <HStack spacing="16px">
      <Select
        value={monthsBack}
        onChange={(e) => {
          console.log(e.target.value);
          setMonthsBack(e.target.value);
        }}
      >
        <option value={1}>Last 30 days</option>
        <option value={2}>Last 60 days</option>
        <option value={12}>Last year</option>
        <option value={1000}>All time</option>
      </Select>
      <Checkbox
        size="lg"
        isChecked={showCategorized}
        onChange={(e) => setShowCategorized((prev) => !prev)}
      >
        Categorized
      </Checkbox>
    </HStack>
  );
}

Filters.propTypes = {
  monthsBack: PropTypes.number.isRequired,
  setMonthsBack: PropTypes.func.isRequired,
  showCategorized: PropTypes.bool.isRequired,
  setShowCategorized: PropTypes.func.isRequired,
};

export default memo(Filters);
