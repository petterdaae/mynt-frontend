import { Route, Switch } from "react-router-dom";

import styled from "styled-components";
import { mainFontColor } from "./components/color";

import Authenticated from "./authenticated";
import Login from "./login";

import Settings from "./pages/settings";
import Spendings from "./pages/spendings";
import Categories from "./pages/categories";
import Transactions from "./pages/transactions";

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
          <Route path="/authenticated/spendings" component={Spendings} />
        </Authenticated>
      </Switch>
    </Wrapper>
  );
}

export default App;
