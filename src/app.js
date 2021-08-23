import { Route, Switch } from "react-router-dom";
import { Login, Dashboard, Spendings, Categories, Settings } from "./views";
import { Navigation } from "./components";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/authenticated" component={Login}>
          <Navigation>
            <Route path="/authenticated/dashboard" component={Dashboard} />
            <Route path="/authenticated/spendings" component={Spendings} />
            <Route path="/authenticated/categories" component={Categories} />
            <Route path="/authenticated/settings" component={Settings} />
          </Navigation>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
