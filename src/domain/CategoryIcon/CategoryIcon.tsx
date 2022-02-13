import { Avatar } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

interface Props {
  color: string;
  size: string;
}

function CategoryIcon({ color, size }: Props) {
  return <Avatar bg={color} icon={<ViewIcon color={color} />} size={size} />;
}

export default CategoryIcon;
