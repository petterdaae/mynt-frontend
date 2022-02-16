import { Input } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  value: string | null;
  setValue: (newValue: string | null) => void;
}

const regex =
  /^([0-9]{4}|[0-9]{2})[./-]([0][1-9]|[1][0-2])[./-]([0][1-9]|[1|2][0-9]|[3][0|1])$/;

function DateInput({ value, setValue }: Props) {
  const [textValue, setTextValue] = useState(value ?? "");

  return (
    <Input
      value={textValue}
      onChange={(e) => {
        setTextValue(e.target.value);
        if (regex.test(e.target.value)) {
          setValue(e.target.value);
        } else {
          setValue(null);
        }
      }}
    />
  );
}

export default DateInput;
