import { Route, Switch } from "react-router-dom";
import Login from "./views/login";
import Authenticated from "./views/authenticated";
import UpdateSbankenSecrets from "./views/updateSbankenSecrets";

function App() {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/authenticated" component={Authenticated} />
            <Route path="/settings" component={UpdateSbankenSecrets} />
        </Switch>
    );
}

export default App;
