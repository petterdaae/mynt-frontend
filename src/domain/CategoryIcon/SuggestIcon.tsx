import { Avatar } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface Props {
  size: string;
}

function CategoryIcon({ size }: Props) {
  return (
    <Avatar bg={"lightgray"} icon={<StarIcon color={"silver"} />} size={size} />
  );
}

export default CategoryIcon;
