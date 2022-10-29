import { HStack, Text, VStack, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import CategoryIcon from "../Icons/CategoryIcon";
import { EditableCategorization } from "../../types";

interface Props {
  setCategorizationBeingEdited: (id: number | null) => void;
  categorization: EditableCategorization;
}

function ChangeCategory({
  setCategorizationBeingEdited,
  categorization,
}: Props) {
  return (
    <VStack align="left">
      <HStack justify="space-between" key={categorization.id}>
        <HStack>
          <CategoryIcon
            color={categorization.category?.color ?? "lightgray"}
            size="sm"
          />
          <Text fontWeight="semibold">
            {categorization.category?.name ?? "No category"}
          </Text>
        </HStack>
        <HStack align="right">
          <IconButton
            aria-label="Edit category"
            icon={<EditIcon />}
            onClick={() => setCategorizationBeingEdited(categorization.id)}
          />
        </HStack>
      </HStack>
    </VStack>
  );
}

export default ChangeCategory;
