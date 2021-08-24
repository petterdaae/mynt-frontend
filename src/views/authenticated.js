import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { base, breakpoint } from "../components/size";
import { mainFontColor, weakFontColor } from "../components/color";

const ContentWrapper = styled.div`
  width: ${breakpoint}px;
  margin: auto;
  overflow: hidden;

  margin-top: ${18 * base}px;
  @media (max-width: ${breakpoint}px) {
    width: auto;
  }
`;

const NavigationWrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;

  background: white;
  border-bottom: 1px solid lightgray;
  display: flex;
`;

const Navigation = styled.div`
  width: ${breakpoint}px;
  margin: auto;
  @media (max-width: ${breakpoint}px) {
    width: auto;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${14 * base}px;
`;

const StyledNavigationItem = styled.div`
  color: ${weakFontColor};
  margin-left: ${base}px;
  margin-right: ${base}px;

  &:first-child {
    margin-left: ${8 * base}px;
  }

  &:last-child {
    margin-right: ${8 * base}px;
  }

  &:hover {
    color: ${mainFontColor};
    cursor: pointer;
    text-decoration: underline;
  }

  ${(props) => {
    if (props.active) {
      return `
        color: ${mainFontColor};
      `;
    }
  }}
`;

const Content = styled.div`
  width: 100%;
`;

function Authenticated({ children }) {
  return (
    <>
      <NavigationWrapper>
        <Navigation>
          <NavigationItem path="/authenticated/dashboard" name="Home" />
          <NavigationItem path="/authenticated/settings" name="Spendings" />
          <NavigationItem path="/authenticated/settings" name="Categories" />
          <NavigationItem path="/authenticated/settings" name="Settings" />
        </Navigation>
      </NavigationWrapper>
      <ContentWrapper>
        <Content>{children}</Content>
      </ContentWrapper>
    </>
  );
}

Authenticated.propTypes = {
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

export default Authenticated;
