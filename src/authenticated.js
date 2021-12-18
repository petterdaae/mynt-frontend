import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { base, breakpoint } from "./components/size";
import { mainFontColor, weakFontColor } from "./components/color";
import { useEffect } from "react";

const ContentWrapper = styled.div`
  width: ${breakpoint}px;
  margin: auto;

  margin-top: ${10 * base}px;
  padding: ${8 * base}px;

  @media (max-width: ${breakpoint}px) {
    width: auto;
    margin-top: ${14 * base}px;
    padding: ${2 * base}px;
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
  useEffect(() => {
    // Fetch auth expiry cookie and redirect to login if not available
    const authExpiry = getCookie("auth_expiry");
    if (!authExpiry) {
      window.location.replace(`/`);
      return;
    }

    // Redirect to login if auth is expired
    const now = Date.now() / 1000;
    if (authExpiry <= now) {
      window.location.replace(`/`);
      return;
    }

    // Set timeout so that the user is redirected to login
    // when the auth cookie expires
    const padding = 60;
    const timeout = setTimeout(() => {
      window.location.replace(`/`);
    }, (authExpiry - now - padding) * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <NavigationWrapper>
        <Navigation>
          <NavigationItem
            path="/authenticated/transactions"
            name="Transactions"
          />
          <NavigationItem path="/authenticated/categories" name="Categories" />
          <NavigationItem path="/authenticated/settings" name="Settings" />
          <NavigationItem path="/authenticated/spendings" name="Spendings" />
          <NavigationItem
            path="/authenticated/ccategories"
            name="Ccategories"
          />
        </Navigation>
      </NavigationWrapper>
      <ContentWrapper>
        <Content>{children}</Content>
      </ContentWrapper>
    </>
  );
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
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
