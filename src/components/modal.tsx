import styled from "styled-components";
import { base, breakpoint } from "./size";

type Props = {
  show: boolean;
  children: React.ReactNode;
  className?: string;
};

const StyledModal = styled(Modal)`
  position: fixed;
  top: 0;
  right: 0;
  overflow: auto;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.65);
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  padding: ${8 * base}px;
  box-sizing: border-box;

  @media (min-width: ${breakpoint}px) {
    width: ${100 * base}px;
    height: unset;
    margin: auto;
    border: 1px solid #ccc;
    margin-top: ${50 * base}px;
  }
`;

function Modal({ show, children, className }: Props) {
  if (!show) {
    return <></>;
  }
  return (
    <div className={className}>
      <Content>{children}</Content>
    </div>
  );
}

export default StyledModal;
