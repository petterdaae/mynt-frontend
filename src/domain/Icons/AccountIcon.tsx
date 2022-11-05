import { Avatar } from "@chakra-ui/react";
import { BsPiggyBank, BsCreditCard } from "react-icons/bs";
import { red, yellow } from "../../colors";

interface Props {
  size: string;
  isCard: boolean | undefined;
  onClick: () => void;
}

function CategoryIcon({ size, isCard, onClick }: Props) {
  return (
    <Avatar
      bg={isCard ? red : yellow}
      icon={isCard ? <BsCreditCard /> : <BsPiggyBank />}
      size={size}
      onClick={onClick}
    />
  );
}

export default CategoryIcon;
