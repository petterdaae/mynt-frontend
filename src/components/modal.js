import PropTypes from "prop-types";
import styled from "styled-components";
import { base, breakpoint } from "./size";

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

function Modal({ show, children, className }) {
  return (
    show && (
      <div className={className}>
        <Content>{children}</Content>
      </div>
    )
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default StyledModal;
