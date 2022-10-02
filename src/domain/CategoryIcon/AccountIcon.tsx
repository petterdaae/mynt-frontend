import { Avatar } from "@chakra-ui/react";
import { BsPiggyBank, BsCreditCard } from "react-icons/bs";

interface Props {
  size: string;
  isCard: boolean | undefined;
}

function CategoryIcon({ size, isCard }: Props) {
  return (
    <Avatar
      bg={"lightgray"}
      icon={isCard ? <BsCreditCard /> : <BsPiggyBank />}
      size={size}
    />
  );
}

export default CategoryIcon;
