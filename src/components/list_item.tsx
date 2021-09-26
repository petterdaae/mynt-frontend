import React from "react";
import styled from "styled-components";
import { base } from "./size";

type Props = {
  onClick: () => void;
  className: string;
  children: React.ReactNode;
};

const StyledListItem = styled(ListItem)`
  padding: ${4 * base}px;
  border: 1px solid #ccc;
  border-top: none;

  &:hover {
    cursor: pointer;
    background: whitesmoke;
  }
`;

function ListItem({ onClick, className, children }: Props) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}

export default StyledListItem;
