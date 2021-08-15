import { Route, Switch } from "react-router-dom";
import Login from "./views/login";
import Authenticated from "./views/authenticated";
import UpdateSbankenSecrets from "./views/updateSbankenSecrets";
import Components from "./views/components";

import styled from "styled-components";

const Wrapper = styled.div`
`;

function App() {
    return (
        <Wrapper>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/authenticated" component={Authenticated} />
                <Route path="/settings" component={UpdateSbankenSecrets} />
                <Route path="/components" component={Components} />
            </Switch>
        </Wrapper>
    );
}

export default App;
