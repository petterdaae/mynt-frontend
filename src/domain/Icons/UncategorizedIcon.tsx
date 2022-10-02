import { Avatar } from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";

interface Props {
  color: string;
  size: string;
}

function CategoryIcon({ color, size }: Props) {
  return <Avatar bg={color} icon={<BsClock />} size={size} />;
}

export default CategoryIcon;
