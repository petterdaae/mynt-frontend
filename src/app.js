import { Button } from 'antd';
import styled from 'styled-components';
import { Route, Switch } from "react-router-dom";
import Signin from "./views/signin";

function App() {
  return (
    <Switch>
      <Route path="/" component={Signin} />
    </Switch>
  );
}

export default App;
