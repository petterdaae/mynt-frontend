import { ModalContent } from "@chakra-ui/react";
import { useWindowSize } from "../hooks";

const breakpoint = 1100;

function ResponsiveModalContent(props: any) {
  const [width] = useWindowSize();
  return width > breakpoint ? (
    <ModalContent {...props} boxShadow="none" />
  ) : (
    <ModalContent {...props} boxShadow="none" mt="0" />
  );
}

export default ResponsiveModalContent;
