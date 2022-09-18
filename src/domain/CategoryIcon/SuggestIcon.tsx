import { Avatar } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface Props {
  size: string;
  onClick: any;
}

function CategoryIcon({ size, onClick }: Props) {
  return (
    <Avatar
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      bg={"lightgray"}
      icon={<StarIcon color={"silver"} />}
      size={size}
    />
  );
}

export default CategoryIcon;
