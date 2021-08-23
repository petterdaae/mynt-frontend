import styled from "styled-components";
import { base } from "./size";
import PropTypes from "prop-types";

const StyledTable = styled.table`
  border-spacing: 0;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const StyledTr = styled.tr`
  &:hover {
  }

  &:first-child {
    &:hover {
      background-color: transparent;
    }
  }
`;

const StyledTd = styled.td`
  padding-top: ${3 * base}px;
  padding-bottom: ${3 * base}px;
  padding-left: ${6 * base}px;
  padding-right: ${6 * base}px;

  border-top: 1px solid grey;
`;

const StyledTh = styled.th`
  padding-left: ${6 * base}px;
  padding-right: ${6 * base}px;
  padding-bottom: ${3 * base}px;
  padding-top: ${3 * base}px;
`;

function Table({ headers, data, className }) {
  return (
    <StyledTable className={className}>
      <StyledTr>
        {headers.map((header) => (
          <StyledTh key={header}>{header}</StyledTh>
        ))}
      </StyledTr>
      {data.map((item) => (
        <StyledTr key={item}>
          {Object.keys(item).map((key) => (
            <StyledTd key={key}>{item[key]}</StyledTd>
          ))}
        </StyledTr>
      ))}
    </StyledTable>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default Table;
