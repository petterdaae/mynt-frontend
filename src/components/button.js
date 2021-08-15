import styled from 'styled-components';
import { dark, darker, white } from './color';
import { base } from './size';

// TODO : Put filter brightness in some variable
const StyledButton = styled.button`
    background-color: #173e43;
    padding-top: ${2 * base}px;
    padding-bottom: ${2 * base}px;
    padding-left: ${5 * base}px;
    padding-right: ${5 * base}px;
    border-radius: ${base}px;
    border: 2px solid #173e43;

    &:hover {
        cursor: pointer;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    &:active {
        box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
    }

    font-family: "Source Sans Pro";
    color: ${white};
`;

/**
 * @kind 'outlined'
 * 
 */
function Button({ kind, children }) {
    return <StyledButton>{children}</StyledButton>
}

export default Button;
