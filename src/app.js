import { Route, Switch } from "react-router-dom";
import { Authenticated, Login, Home, Settings } from "./views";
import styled from "styled-components";
import { mainFontColor } from "./components/color";
import CategoryList from "./components/category_list";

const Wrapper = styled.div`
  color: ${mainFontColor};
`;

function App() {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/" component={Login} />
        <Authenticated>
          <Route path="/authenticated/home" component={Home} />
          <Route path="/authenticated/settings" component={Settings} />
          <Route path="/authenticated/categories" component={CategoryList} />
        </Authenticated>
      </Switch>
    </Wrapper>
  );
}

export default App;
