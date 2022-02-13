import { Input } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  value: number | null;
  setValue: (newValue: number | null) => void;
}

function CurrencyInput({ value, setValue }: Props) {
  const [textValue, setTextValue] = useState(
    value ? (value / 100).toFixed(2) : ""
  );

  return (
    <Input
      value={textValue}
      onChange={(e) => {
        if (/^-?\d*(\.\d{0,2})?$/g.test(e.target.value)) {
          setTextValue(e.target.value);
        }

        const parsedTextValue = parseFloat(e.target.value);
        if (isNaN(parsedTextValue)) {
          setValue(null);
        } else {
          const newValue = Math.round(parsedTextValue * 100);
          setValue(newValue);
        }
      }}
    />
  );
}

export default CurrencyInput;
