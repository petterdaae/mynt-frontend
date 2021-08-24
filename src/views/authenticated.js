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
  /*
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    */
`;

const Navigation = styled.div`
  width: ${breakpoint}px;
  margin: auto;
  overflow: hidden;
  @media (max-width: ${breakpoint}px) {
    width: auto;
  }

  display: flex;
  justify-content: space-evenly;
  margin-bottom: ${2 * base}px;
`;

const StyledNavigationItem = styled.div`
  color: ${weakFontColor};
  margin-top: ${4 * base}px;
  margin-bottom: ${4 * base}px;

  &:hover {
    color: ${mainFontColor};
    cursor: pointer;
    text-decoration: underline;
  }

  ${(props) => {
    if (props.active) {
      return `
        color: ${mainFontColor};
        font-weight: bold;
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
