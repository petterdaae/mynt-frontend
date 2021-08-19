import styled from 'styled-components';
import { darkGreen, white, yellow } from './color';
import { base } from './size';

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`;

const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${darkGreen};
`;

const NavigationHeader = styled.div`
    color: ${white};
    margin: ${6 * base}px;
    margin-left: ${6 * base}px;
    margin-right: ${6 * base}px;

    padding-bottom: ${6 * base}px;
    border-bottom: 1px solid ${yellow};
`;

const NavigationItem = styled.div`
    color: ${white};

    padding: ${2 * base}px;
    padding-left: ${6 * base}px;
    padding-right: ${6 * base}px;

    &:hover {
        background-color: ${yellow};
        color: ${darkGreen};
        cursor: pointer;
    }
`;

const Content = styled.div`
    flex: 1;
    padding: ${16 * base}px;
`;

function Component({ children }) {
    return (
        <Wrapper>
            <Navigation>
                <NavigationHeader>Petter Daae</NavigationHeader>
                <NavigationItem>Dashboard</NavigationItem>
                <NavigationItem>Spending</NavigationItem>
                <NavigationItem>Categories</NavigationItem>
                <NavigationItem>Settings</NavigationItem>
            </Navigation>
            <Content>
                {children}
            </Content>
        </Wrapper>
    );
}

export default Component;
