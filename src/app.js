import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/protected-route";
import Login from "./views/login";
import Authenticated from "./views/authenticated";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <ProtectedRoute path="/authenticated" component={Authenticated} />
    </Switch>
  );
}

export default App;
