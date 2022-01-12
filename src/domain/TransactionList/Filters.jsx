import { memo, useState } from "react";
import {
  HStack,
  Select,
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

function Filters({
  monthsBack,
  setMonthsBack,
  showCategorized,
  setShowCategorized,
  categories,
  loading,
}) {
  const [newMonthsBack, setNewMonthsBack] = useState(monthsBack);
  return (
    <HStack spacing="16px" ml="2" mr="2">
      <Popover placement="bottom-start">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button leftIcon={<SearchIcon />} variant="outline">
                Filters
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Filter transactions</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Select
                    value={newMonthsBack}
                    onChange={(e) => {
                      setNewMonthsBack(parseInt(e.target.value));
                    }}
                  >
                    <option value={1}>Last 30 days</option>
                    <option value={2}>Last 60 days</option>
                    <option value={12}>Last year</option>
                    <option value={1000}>All time</option>
                  </Select>
                  <Button
                    colorScheme="green"
                    onSelect={() => {}}
                    loading={loading}
                    mt="2"
                    onClick={() => {
                      onClose();
                      setMonthsBack(newMonthsBack);
                    }}
                  >
                    Show results
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </HStack>
  );
}

Filters.propTypes = {
  monthsBack: PropTypes.number.isRequired,
  setMonthsBack: PropTypes.func.isRequired,
  showCategorized: PropTypes.bool.isRequired,
  setShowCategorized: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default memo(Filters);
