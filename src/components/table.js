import styled from "styled-components";
import { base } from "./size";
import { darkGreen, grey } from "./color";
import PropTypes from "prop-types";

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  text-align: left;
  color: ${darkGreen};
`;

const StyledTr = styled.tr`
  &:hover {
    background-color: ${grey};
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

  border-top: 1px solid ${grey};
`;

const StyledTh = styled.th`
  padding-left: ${6 * base}px;
  padding-right: ${6 * base}px;
  padding-bottom: ${3 * base}px;
  padding-top: ${3 * base}px;
`;

function Table({ headers, data }) {
  return (
    <StyledTable>
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
};

export default Table;
