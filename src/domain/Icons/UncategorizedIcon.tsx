import { Avatar } from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";

interface Props {
  color: string;
  size: string;
}

function UncategorizedIcon({ color, size }: Props) {
  return <Avatar p="1" bg={color} icon={<BsClock />} size={size} />;
}

export default UncategorizedIcon;
