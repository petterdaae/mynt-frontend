import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { base } from "./size";

const Wrapper = styled.div`
  width: 1400px;
  margin: auto;
  overflow: hidden;

  @media (max-width: 1400px) {
    width: auto;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledNavigationItem = styled.div`
  font-weight: bold;
  color: grey;
  margin-top: ${8 * base}px;
  margin-bottom: ${8 * base}px;

  &:hover {
    color: black;
    cursor: pointer;
  }

  &:active {
    color: black;
  }
`;

const Content = styled.div`
  width: 100%;
`;

function Component({ children }) {
  return (
    <Wrapper>
      <Navigation>
        <NavigationItem path="/authenticated/dashboard" name="Dashboard" />
        <NavigationItem path="/authenticated/spendings" name="Spendings" />
        <NavigationItem path="/authenticated/categories" name="Categories" />
        <NavigationItem path="/authenticated/settings" name="Settings" />
      </Navigation>
      <Content>{children}</Content>
    </Wrapper>
  );
}

Component.propTypes = {
  children: PropTypes.node,
};

function NavigationItem({ path, name }) {
  const history = useHistory();
  const location = useLocation();

  return (
    <StyledNavigationItem
      onClick={() => history.push(path)}
      active={location.pathname === path}
    >
      {name}
    </StyledNavigationItem>
  );
}

NavigationItem.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
};

export default Component;
