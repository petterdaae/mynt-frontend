import styled from 'styled-components';
import { darkGreen, white } from './color';
import { base } from './size';

const StyledButton = styled.button`
    padding-top: ${2 * base}px;
    padding-bottom: ${2 * base}px;
    padding-left: ${5 * base}px;
    padding-right: ${5 * base}px;
    border-radius: ${base}px;

    background-color: ${darkGreen};
    border: 2px solid ${darkGreen};

    font-family: "Source Sans Pro";
    font-weight: bold;
    color: ${white};

    &:hover {
        cursor: pointer;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    &:active {
        box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
    }
`;

export default StyledButton;
