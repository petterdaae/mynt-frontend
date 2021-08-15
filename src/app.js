import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./views/login";
import Authenticated from "./views/authenticated";
import UpdateSbankenSecrets from "./views/updateSbankenSecrets";
import Components from "./views/components";
import { Menu } from 'antd';

import {
    HomeOutlined,
    SettingOutlined,
} from '@ant-design/icons';

import styled from "styled-components";

const Wrapper = styled.div`
`;

const StyledMenu = styled(Menu)``;

function App() {
    const history = useHistory();
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
