import { Avatar } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

interface Props {
  size: string;
}

function CategoryIcon({ size }: Props) {
  return (
    <Avatar
      bg={"lightgray"}
      icon={<QuestionIcon color={"lightgray"} />}
      size={size}
    />
  );
}

export default CategoryIcon;
