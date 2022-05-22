import { Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Authenticated from "./authenticated";
import Login from "./login";

import Settings from "./domain/Settings/Settings";
import TransactionListWithFilters from "./domain/TransactionList/TransactionListWithFilters";
import Spendings from "./domain/Spendings/Spendings";
import Categories from "./domain/Categories/Categories";
import Budgets from "./domain/Budgets/Budgets";
import Prediction from "./domain/Prediction/Prediction";
import Names from "./domain/Names/Names";

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Authenticated>
          <Route
            path="/authenticated/transactions"
            component={TransactionListWithFilters}
          />
          <Route path="/authenticated/settings" component={Settings} />
          <Route path="/authenticated/spendings" component={Spendings} />
          <Route path="/authenticated/categories" component={Categories} />
          <Route path="/authenticated/budgets" component={Budgets} />
          <Route path="/authenticated/prediction" component={Prediction} />
          <Route path="/authenticated/names" component={Names} />
        </Authenticated>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
