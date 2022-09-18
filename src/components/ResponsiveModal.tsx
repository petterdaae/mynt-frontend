import { Modal, ModalProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useWindowSize } from "../hooks";

const breakpoint = 1100;

function ResponsiveModal(
  props: JSX.IntrinsicAttributes & ModalProps & { children?: ReactNode }
) {
  const [width] = useWindowSize();
  return width > breakpoint ? (
    <Modal {...props} size="xl" />
  ) : (
    <Modal {...props} size="xl" />
  );
}

export default ResponsiveModal;
