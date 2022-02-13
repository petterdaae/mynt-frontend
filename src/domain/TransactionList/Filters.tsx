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

interface Props {
  monthsBack: number;
  setMonthsBack: (monthsBack: number) => void;
}

function Filters({ monthsBack, setMonthsBack }: Props) {
  const [newMonthsBack, setNewMonthsBack] = useState<number>(monthsBack);
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

export default memo(Filters);
