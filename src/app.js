import { Route, Switch } from "react-router-dom";
import { Authenticated, Login, Home, Settings } from "./views";
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
        <Route path="/authenticated" component={Login}>
          <Authenticated>
            <Route path="/authenticated/home" component={Home} />
            <Route path="/authenticated/settings" component={Settings} />
          </Authenticated>
        </Route>
      </Switch>
    </Wrapper>
  );
}

export default App;
