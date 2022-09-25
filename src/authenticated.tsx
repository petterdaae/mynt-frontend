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
  z-index: 3;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
`;

const OtherHackyWrapper = styled.div`
  margin-top: 68px;
`;

function Authenticated({ children }: { children: React.ReactNode }) {
  const history = useHistory();
  useEffect(() => {
    // Fetch auth expiry cookie and redirect to login if not available
    const authExpiry = parseInt(getCookie("auth_expiry") as string);
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

  const [tabIndex, setTabIndex] = useState<number | null>(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/authenticated/transactions") {
      setTabIndex(0);
    } else if (location.pathname === "/authenticated/categories") {
      setTabIndex(-1);
    } else if (location.pathname === "/authenticated/spendings") {
      setTabIndex(1);
    } else if (location.pathname === "/authenticated/settings") {
      setTabIndex(-1);
    } else if (location.pathname === "/authenticated/budgets") {
      setTabIndex(-1);
    } else if (location.pathname === "/authenticated/prediction") {
      setTabIndex(-1);
    } else if (location.pathname === "/authenticated/names") {
      setTabIndex(-1);
    } else if (location.pathname === "/authenticated/home") {
      setTabIndex(-1);
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
              index={tabIndex ?? undefined}
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
                    history.push("/authenticated/categories");
                  }}
                >
                  Categories
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push("/authenticated/budgets");
                  }}
                >
                  Budgets
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push("/authenticated/settings");
                  }}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push("/authenticated/prediction");
                  }}
                >
                  Prediction
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push("/authenticated/names");
                  }}
                >
                  Names
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push("/authenticated/home");
                  }}
                >
                  Home
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

function getCookie(name: string): string {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop()?.split(";").shift() as string;
  return "";
}

Authenticated.propTypes = {
  children: PropTypes.node,
};

function NavigationItem({
  path,
  name,
  setTabIndex,
  tabIndex,
}: {
  path: string;
  name: string;
  setTabIndex: (index: number | null) => void;
  tabIndex: number | null;
}) {
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
