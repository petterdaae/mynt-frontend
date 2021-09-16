import { Route, Switch } from "react-router-dom";
import {
  Authenticated,
  Login,
  Transactions,
  Settings,
  Categories,
} from "./views";
import styled from "styled-components";
import { mainFontColor } from "./components/color";

const Wrapper = styled.div`
  color: ${mainFontColor};
`;

function App() {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/" component={Login} />
        <Authenticated>
          <Route path="/authenticated/transactions" component={Transactions} />
          <Route path="/authenticated/settings" component={Settings} />
          <Route path="/authenticated/categories" component={Categories} />
        </Authenticated>
      </Switch>
    </Wrapper>
  );
}

export default App;
