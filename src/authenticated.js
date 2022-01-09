import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";

const base = 4;
const breakpoint = 1100;

const ContentWrapper = styled.div`
  width: ${breakpoint}px;
  margin: auto;

  @media (max-width: ${breakpoint}px) {
    width: auto;
    padding: ${2 * base}px;
  }
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

  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/authenticated/transactions") {
      setTabIndex(0);
    } else if (location.pathname === "/authenticated/categories") {
      setTabIndex(1);
    } else if (location.pathname === "/authenticated/spendings") {
      setTabIndex(2);
    } else if (location.pathname === "/authenticated/settings") {
      setTabIndex(3);
    }
  }, [location]);

  return (
    <>
      <Tabs variant="enclosed" mt="2" mb="4" index={tabIndex} align="center">
        <TabList>
          <NavigationItem
            path="/authenticated/transactions"
            name="Tr."
            setTabIndex={setTabIndex}
            tabIndex={0}
          />
          <NavigationItem
            path="/authenticated/categories"
            name="Ca."
            setTabIndex={setTabIndex}
            tabIndex={1}
          />
          <NavigationItem
            path="/authenticated/spendings"
            name="Sp."
            setTabIndex={setTabIndex}
            tabIndex={2}
          />
          <NavigationItem
            path="/authenticated/settings"
            name="Se."
            setTabIndex={setTabIndex}
            tabIndex={3}
          />
        </TabList>
      </Tabs>
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

function NavigationItem({ path, name, setTabIndex, tabIndex }) {
  const history = useHistory();

  return (
    <Tab
      onClick={() => {
        setTabIndex(tabIndex);
        history.push(path);
      }}
    >
      {name}
    </Tab>
  );
}

NavigationItem.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  setTabIndex: PropTypes.func,
  tabIndex: PropTypes.number,
};

export default Authenticated;
