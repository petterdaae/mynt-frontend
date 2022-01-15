import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const breakpoint = 1100;

const ContentWrapper = styled.div`
  width: ${breakpoint}px;
  margin: auto;

  @media (max-width: ${breakpoint}px) {
    width: auto;
  }
`;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
`;

const OtherHackyWrapper = styled.div`
  margin-top: 75px;
`;

function Authenticated({ children }) {
  const history = useHistory();
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
      setTabIndex(null);
    } else if (location.pathname === "/authenticated/spendings") {
      setTabIndex(1);
    } else if (location.pathname === "/authenticated/settings") {
      setTabIndex(null);
    } else if (location.pathname === "/authenticated/budgets") {
      setTabIndex(null);
    }
  }, [location]);

  return (
    <>
      <NavWrapper>
        <ContentWrapper>
          <Flex justify="space-between" align="center" pr="2" pl="2">
            <Tabs
              variant="soft-rounded"
              colorScheme="green"
              index={tabIndex}
              align="center"
              mt="2"
              mb="2"
            >
              <TabList>
                <NavigationItem
                  path="/authenticated/transactions"
                  name="Transactions"
                  setTabIndex={setTabIndex}
                  tabIndex={0}
                />
                <NavigationItem
                  path="/authenticated/spendings"
                  name="Spendings"
                  setTabIndex={setTabIndex}
                  tabIndex={1}
                />
              </TabList>
            </Tabs>
            <Menu placement="bottom-end">
              <MenuButton as={IconButton} icon={<HamburgerIcon />} />
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setTabIndex(null);
                    history.push("/authenticated/categories");
                  }}
                >
                  Categories
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setTabIndex(null);
                    history.push("/authenticated/budgets");
                  }}
                >
                  Budgets
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setTabIndex(null);
                    history.push("/authenticated/settings");
                  }}
                >
                  Settings
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </ContentWrapper>
        <Divider />
      </NavWrapper>
      <OtherHackyWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </OtherHackyWrapper>
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
