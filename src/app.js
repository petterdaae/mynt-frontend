import { Route, Switch } from "react-router-dom";
import { Authenticated, Login, Home, Settings } from "./views";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/authenticated" component={Login}>
          <Authenticated>
            <Route path="/authenticated/dashboard" component={Home} />
            <Route path="/authenticated/settings" component={Settings} />
          </Authenticated>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
