import { Avatar } from "@chakra-ui/react";
import { ImMagicWand } from "react-icons/im";

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
      bg="#cea2fd"
      icon={<ImMagicWand color="black" />}
      size={size}
    />
  );
}

export default CategoryIcon;
