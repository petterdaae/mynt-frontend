import { Route, Switch } from "react-router-dom";
import {
  Authenticated,
  Login,
  Dashboard,
  Spendings,
  Categories,
  Settings,
} from "./views";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/authenticated" component={Login}>
          <Authenticated>
            <Route path="/authenticated/dashboard" component={Dashboard} />
            <Route path="/authenticated/spendings" component={Spendings} />
            <Route path="/authenticated/categories" component={Categories} />
            <Route path="/authenticated/settings" component={Settings} />
          </Authenticated>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
