import { Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import styled from "styled-components";
import { mainFontColor } from "./components/color";

import Authenticated from "./authenticated";
import Login from "./login";

import Settings from "./pages/settings";
import Categories from "./pages/categories";
import TransactionListWithFilters from "./domain/TransactionList/TransactionListWithFilters";
import Spendings from "./domain/Spendings/Spendings";
import Ccategories from "./domain/Categories/Categories";

import { TransactionsProvider } from "./hooks/domain/useTransactions";
import { AccountsProvider } from "./hooks/domain/useAccounts";
import { CategoriesProvider } from "./hooks/domain/useCategories";
import { SpendingsProvider } from "./hooks";

const Wrapper = styled.div`
  color: ${mainFontColor};
`;

function App() {
  return (
    <ChakraProvider>
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Login} />
          <Authenticated>
            <CategoriesProvider>
              <SpendingsProvider>
                <AccountsProvider>
                  <TransactionsProvider>
                    <Route
                      path="/authenticated/transactions"
                      component={TransactionListWithFilters}
                    />
                    <Route
                      path="/authenticated/settings"
                      component={Settings}
                    />
                    <Route
                      path="/authenticated/categories"
                      component={Categories}
                    />
                    <Route
                      path="/authenticated/spendings"
                      component={Spendings}
                    />
                    <Route
                      path="/authenticated/ccategories"
                      component={Ccategories}
                    />
                  </TransactionsProvider>
                </AccountsProvider>
              </SpendingsProvider>
            </CategoriesProvider>
          </Authenticated>
        </Switch>
      </Wrapper>
    </ChakraProvider>
  );
}

export default App;
