import styled from 'styled-components';
import { darkGreen, green, white, yellow } from './color';
import { base } from './size';
import { FaHome, FaWallet, FaShapes, FaCog } from "react-icons/fa";
import { useHistory, useLocation } from 'react-router-dom';


const Wrapper = styled.div`
    display: flex;
    height: 100%;
`;

const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${darkGreen};
    width: ${64 * base}px;
`;

const NavigationHeader = styled.div`
    color: ${white};
    padding: ${6 * base}px;
    padding-top: ${32 * base}px;
    background: ${green};
    font-size: ${6 * base}px;
    font-weight: bold;

    margin-bottom: ${6 * base}px;
    border-bottom: 4px solid ${yellow};
`;

const StyledNavigationItem = styled.div`
    color: ${white};
    font-size: ${4 * base}px;

    display: flex;
    height: ${8 * base}px;
    align-items: center;
    padding: ${2 * base}px;
    padding-left: ${6 * base}px;

    &:hover {
        background-color: ${yellow};
        color: ${darkGreen};
        cursor: pointer;
    }

    ${props => props.active && `
        background-color: ${yellow};
        color: ${darkGreen};
    `}
`;

const Content = styled.div`
    flex: 1;
    padding: ${16 * base}px;
`;

const iconStyle = `
    height: 100%;
    padding-right: ${2 * base}px;
`;

const StyledFaHome = styled(FaHome)`${iconStyle}`;
const StyledFaWallet = styled(FaWallet)`${iconStyle}`;
const StyledFaShapes = styled(FaShapes)`${iconStyle}`;
const StyledFaCog = styled(FaCog)`${iconStyle}`;

function Component({ children }) {
    return (
        <Wrapper>
            <Navigation>
                <NavigationHeader>Mynt</NavigationHeader>
                <NavigationItem path="/authenticated/dashboard"><StyledFaHome /> Dashboard</NavigationItem>
                <NavigationItem path="/authenticated/spendings"><StyledFaWallet /> Spendings</NavigationItem>
                <NavigationItem path="/authenticated/categories"><StyledFaShapes /> Categories</NavigationItem>
                <NavigationItem path="/authenticated/settings"><StyledFaCog /> Settings</NavigationItem>
            </Navigation>
            <Content>
                {children}
            </Content>
        </Wrapper>
    );
}

function NavigationItem({ children, path }) {
    const history = useHistory();
    const location = useLocation();

    return (
        <StyledNavigationItem
            onClick={() => history.push(path)}
            active={location.pathname === path}
        >
            {children}
        </StyledNavigationItem>
    );
}


export default Component;
