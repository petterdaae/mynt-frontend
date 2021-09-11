import PropTypes from "prop-types";
import styled from "styled-components";

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
  width: 400px;
  margin: auto;
  background: white;
  border: 1px solid #ccc;
  margin-top: 150px;
  padding: 32px;
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
  children: PropTypes.element,
  className: PropTypes.string,
};

export default StyledModal;
