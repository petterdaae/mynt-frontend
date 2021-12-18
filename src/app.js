import { Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Authenticated from "./authenticated";
import Login from "./login";

import Settings from "./domain/Settings/Settings";
import TransactionListWithFilters from "./domain/TransactionList/TransactionListWithFilters";
import Spendings from "./domain/Spendings/Spendings";
import Categories from "./domain/Categories/Categories";

import { TransactionsProvider } from "./hooks/domain/useTransactions";
import { AccountsProvider } from "./hooks/domain/useAccounts";
import { CategoriesProvider } from "./hooks/domain/useCategories";
import { SpendingsProvider } from "./hooks/domain/useSpendings";

function App() {
  return (
    <ChakraProvider>
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
                  <Route path="/authenticated/settings" component={Settings} />
                  <Route
                    path="/authenticated/spendings"
                    component={Spendings}
                  />
                  <Route
                    path="/authenticated/categories"
                    component={Categories}
                  />
                </TransactionsProvider>
              </AccountsProvider>
            </SpendingsProvider>
          </CategoriesProvider>
        </Authenticated>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
